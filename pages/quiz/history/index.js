import TitlePage from "@/components/TitlePage";
import firebase_app from "@/src/firebase/config";
import { getUserFromCookie } from "@/src/setCookie";
import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
//   console.log(dateStr);
//   // const dateObj = parseISO(dateStr);
//   // return format(dateObj, "EEEE, dd MMMM yyyy", { locale: id });
// };

export default function HistoryQuiz() {
  const auth = getAuth(firebase_app);
  const user = auth.currentUser;
  const db = getFirestore(firebase_app);
  const [result, setResult] = useState([]);
  const router = useRouter();
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
    };
    getData();
  }, []);
  console.log(result);
  return (
    <>
      <div className="mx-4 my-5">
        <Image
          src="/mindwell.png"
          className="object-center"
          width={100}
          height={33}
          alt="Logo"
        />
        <TitlePage title={"History Quiz"} />
        {result.map((item) => (
          <div className="flex flex-col">
            <a href={"/quiz/history/" + item.result_id}>
              <div className="w-full mx-auto rounded-lg bg-white px-5 py-5 my-5 text-gray-800 border border-gray-200 flex flex-row shadow-md">
                <img src="/ilustrations/psychology.png" className="h-28 w-28" />
                <div className="ml-4">
                  <div className="mb-3">
                    <h2 className="text-lg font-semibold text-gray-800 capitalize">
                      {item.penyakit}
                    </h2>
                  </div>
                  <p className="text-sm text-justify line-clamp-4 text-gray-600">
                    {item.description}
                  </p>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </>
  );
}
