import Navbar from "@/components/Navbar";
import TitlePage from "@/components/TitlePage";
import firebase_app from "@/src/firebase/config";
import { getUserFromCookie } from "@/src/setCookie";
import { getAuth } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";

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

export default function Test() {
  const auth = getAuth(firebase_app);
  const router = useRouter();
  const user = auth.currentUser;
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        router.push("/login");
      }
    });
  }, []);
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
        <div className="flex flex-col">
          <TitlePage title={"Pick your quiz"} />
          <a href="/quiz/mental-health">
            <div className="w-full mx-auto rounded-lg bg-white px-5 py-5 my-5 text-gray-800 border border-gray-200 flex flex-row shadow-md">
              <img src="/ilustrations/psychology.png" className="h-28 w-28" />
              <div className="ml-4">
                <div className="mb-3">
                  <h2 className="text-lg font-semibold text-gray-800 capitalize">
                    Mental Health
                  </h2>
                </div>
                <p className="text-sm text-justify line-clamp-4 text-gray-600">
                  A mental health quiz is a brief assessment tool designed to
                  help individuals identify potential symptoms or signs of
                  mental health concerns.
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>
      <Navbar />
    </>
  );
}
