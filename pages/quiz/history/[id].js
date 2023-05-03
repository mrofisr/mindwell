import LoadingPage from "@/components/Loading";
import firebase_app from "@/src/firebase/config";
import { Transition } from "@headlessui/react";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { deleteCookie, getCookie } from "cookies-next";

export async function getServerSideProps({ req, res }) {
  const auth = getCookie("auth", { req, res });
  if (!auth) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  // If the user is authenticated, return some data as props
  return {
    props: {
      data: "Some data for authenticated users",
    },
  };
}

export default function HistoryQuizId() {
  const router = useRouter();
  const auth = getAuth(firebase_app);
  const [result, setResult] = useState([]);
  const db = getFirestore(firebase_app);
  const [isLoading, setIsLoading] = useState(true);
  //same name as name of your file, can be [slug].js; [specialId].js - any name you want
  const { id } = router.query;
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (!authUser && !getCookie("auth")) {
        deleteCookie("auth");
        auth.signOut();
        router.push("/login");
      }
    });
    const getData = async () => {
      const docRef = doc(db, "sistem-pakar", "mental-health");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const allResults = docSnap.data().result;
        const filteredResults = allResults.filter(
          (result) => result.result_id === id
        );
        setResult(filteredResults);
      } else {
        console.log("Document does not exist");
      }
      setIsLoading(false);
    };
    getData();
  }, [id]);
  return (
    <>
      <div className="mx-4 my-5">
        {!isLoading ? (
          <div>
            <Transition
              show={true}
              enter="transition-all ease-in-out duration-500 delay-[200ms]"
              enterFrom="opacity-0 translate-y-6"
              enterTo="opacity-100 translate-y-0"
              leave="transition-all ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Image
                src="/mindwell.png"
                width={100}
                height={33}
                alt="Logo"
                onClick={() => router.push("/")}
              />
              <h1 className="font-bold text-2xl text-center">
                {result[0]?.penyakit}
              </h1>
              <div className="flex justify-center">
                <img
                  className="my-6"
                  src={"/ilustrations/image.png"}
                  alt={result[0]?.penyakit}
                />
              </div>
              <p className="text-sm text-justify text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                vestibulum odio erat, facilisis mollis neque varius nec. Ut mi
                nisi, sodales ut orci eget, commodo gravida lorem. Praesent
                facilisis ex libero, vitae blandit metus imperdiet id. Sed
                fermentum suscipit arcu, placerat imperdiet quam tincidunt
                vitae. Morbi efficitur imperdiet dui, non feugiat quam iaculis
                nec. Vestibulum dapibus libero faucibus mauris tempus suscipit.
                Vivamus mauris mi, ultrices eget lacus ac, eleifend pharetra
                nulla. Pellentesque vel tempor ligula. Morbi augue urna,
                tincidunt sit amet sapien at, maximus rutrum nulla. In sodales
                hendrerit eleifend. Donec vestibulum fermentum orci eget
                feugiat. Cras scelerisque facilisis nibh vel varius. Sed
                lobortis dolor at rutrum bibendum. Nunc lacinia sodales ipsum.
                Vivamus efficitur egestas dolor, id blandit lorem ullamcorper
                ac. Pellentesque a convallis dui. Curabitur nec felis sagittis
                diam interdum egestas. Mauris facilisis dictum scelerisque.
                Praesent cursus finibus nunc. Aenean a sem sed mauris hendrerit
                luctus et eu augue. Mauris hendrerit condimentum malesuada.
                Pellentesque habitant morbi tristique senectus et netus et
                malesuada fames ac turpis egestas.
              </p>
            </Transition>
          </div>
        ) : (
          <LoadingPage />
        )}
      </div>
    </>
  );
}
