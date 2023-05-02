import TitlePage from "@/components/TitlePage";
import firebase_app from "@/src/firebase/config";
import { getUserFromCookie } from "@/src/setCookie";
import { Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import LoadingPage from "@/components/Loading";
import { Transition } from "@headlessui/react";

// export async function getServerSideProps(context) {
//   const user = getUserFromCookie(context.req);
//   if (!user) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     };
//   }
//   // If the user is authenticated, return some data as props
//   return {
//     props: {
//       data: 'Some data for authenticated users',
//     },
//   };
// }
// const formatDate = (dateStr) => {
//   // const dateObj = parseISO(dateStr);
//   // return format(dateObj, "EEEE, dd MMMM yyyy", { locale: id });
// };

const formatDate = (dateStr) => {
  const dateObj = new Date(dateStr);
  return format(dateObj, "EEEE, dd MMMM yyyy", { locale: id });
};

export default function HistoryQuiz() {
  const auth = getAuth(firebase_app);
  const user = auth.currentUser;
  const db = getFirestore(firebase_app);
  const [result, setResult] = useState([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        router.push("/login");
      }
    });
    const getData = async () => {
      const docRef = doc(db, "sistem-pakar", "mental-health");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const allResults = docSnap.data().result;
        const filteredResults = allResults.filter(
          (result) => result.uid === user?.uid
        );
        setResult(filteredResults);
      } else {
        console.log("Document does not exist");
      }
      setIsLoading(false);
    };
    getData();
  }, [user]);
  return (
    <>
      <div className="mx-4 my-5">
        {!isLoading ? (
          <div>
            <Image
              src="/mindwell.png"
              className="object-center"
              width={100}
              height={33}
              alt="Logo"
              onClick={() => router.push("/")}
            />
            <TitlePage title={"History Quiz"} />
            <Transition
              show={true}
              enter="transition-opacity duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              {result.map((item) => (
                <div className="flex flex-col" key={item?.result_id}>
                  <Link href={"/quiz/history/" + item?.result_id}>
                    <div className="w-full mx-auto rounded-lg bg-white px-5 py-5 my-5 text-gray-800 border border-gray-200 flex flex-row shadow-md">
                      <img
                        src="/ilustrations/psychology.png"
                        className="h-28 w-28"
                      />
                      <div className="ml-4">
                        <div className="mb-3">
                          <h2 className="text-lg font-semibold text-gray-800 capitalize">
                            {item?.penyakit}
                          </h2>

                          <p className="text-sm text-gray-500">
                            {formatDate(
                              new Timestamp(
                                item?.createdAt.seconds,
                                item?.createdAt.nanoseconds
                              ).toDate()
                            )}
                          </p>
                        </div>
                        <p className="text-sm text-justify line-clamp-4 text-gray-600">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Duis vestibulum odio erat, facilisis mollis
                          neque varius nec. Ut mi nisi, sodales ut orci eget,
                          commodo gravida lorem. Praesent facilisis ex libero,
                          vitae blandit metus imperdiet id. Sed fermentum
                          suscipit arcu, placerat imperdiet quam tincidunt
                          vitae. Morbi efficitur imperdiet dui, non feugiat quam
                          iaculis nec. Vestibulum dapibus libero faucibus mauris
                          tempus suscipit. Vivamus mauris mi, ultrices eget
                          lacus ac, eleifend pharetra nulla. Pellentesque vel
                          tempor ligula. Morbi augue urna, tincidunt sit amet
                          sapien at, maximus rutrum nulla. In sodales hendrerit
                          eleifend. Donec vestibulum fermentum orci eget
                          feugiat. Cras scelerisque facilisis nibh vel varius.
                          Sed lobortis dolor at rutrum bibendum. Nunc lacinia
                          sodales ipsum. Vivamus efficitur egestas dolor, id
                          blandit lorem ullamcorper ac. Pellentesque a convallis
                          dui. Curabitur nec felis sagittis diam interdum
                          egestas. Mauris facilisis dictum scelerisque. Praesent
                          cursus finibus nunc. Aenean a sem sed mauris hendrerit
                          luctus et eu augue. Mauris hendrerit condimentum
                          malesuada. Pellentesque habitant morbi tristique
                          senectus et netus et malesuada fames ac turpis
                          egestas. Maecenas facilisis dui sed dignissim
                          malesuada. Phasellus porttitor odio ac euismod semper.
                          Donec ultrices posuere sapien eu egestas. Vestibulum
                          mauris urna, ornare ut sagittis et, sollicitudin
                          pellentesque justo. Duis a erat diam. Curabitur id
                          purus dolor. Nullam ut tempor dui.
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </Transition>
          </div>
        ) : (
          <LoadingPage />
        )}
      </div>
    </>
  );
}
