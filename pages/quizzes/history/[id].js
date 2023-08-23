import LoadingPage from "@/components/Loading";
import firebase_app from "@/src/firebase/config";
import { Transition } from "@headlessui/react";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { deleteCookie, getCookie } from "cookies-next";
import { Layout } from "@/components/Layout";

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

export default function HistoryTestId() {
  const router = useRouter();
  const auth = getAuth(firebase_app);
  const [result, setResult] = useState([]);
  const db = getFirestore(firebase_app);
  const [isLoading, setIsLoading] = useState(true);
  //same name as name of your file, can be [slug].js; [specialId].js - any name you want
  const { id } = router.query;
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (!authUser || !getCookie("auth")) {
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
      <Layout>
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
                  {result[0]?.nama_penyakit}
                </h1>
                <div className="flex justify-center">
                  <img
                    src={`/ilustrations/${result[0]?.nama_penyakit.toLowerCase()}.png`}
                    className="h-28 w-28 my-5"
                  />
                </div>
                <p className="font-bold">Deskripsi:</p>
                <p className="text-md text-justify text-gray-600 leading-7 indent-8 prose-stone">
                  {result[0]?.deskripsi}
                </p>
                <p className="font-bold">Penyebab:</p>
                <p className="text-md text-justify text-gray-600 leading-7 indent-8 prose-stone">
                  {result[0]?.penyebab}
                </p>
                <p className="font-bold">Solusi:</p>
                <p className="text-md text-justify text-gray-600 leading-7 indent-8 prose-stone">
                  {result[0]?.solusi}
                </p>
                <button
                  className="mt-10 text-center w-full py-3.5 rounded-lg bg-rose-400 border-b-4 border-rose-500 text-white"
                  onClick={(e) => {
                    router.push("/quizzes/history");
                  }}
                >
                  Back to History Quizzes
                </button>
              </Transition>
            </div>
          ) : (
            <LoadingPage />
          )}
        </div>
      </Layout>
    </>
  );
}
