import firebase_app from "@/src/firebase/config";
import { getAuth } from "firebase/auth";
import Image from "next/image";
import { useEffect } from "react";

export async function getServerSideProps(context) {
  const { req } = context;
  const cookies = req.headers.cookie;
  if (!cookies) {
    // If the user is not signed in, redirect to the login page
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  // If the user is signed in, return an empty props object
  return { props: {} };
}

export default function HistoryQuiz() {
  const auth = getAuth(firebase_app);
  const user = auth.currentUser;
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        window.location.href = "/login";
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
      </div>
    </>
  );
}
