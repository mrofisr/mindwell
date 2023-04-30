import firebase_app from "@/src/firebase/config";
import { getUserFromCookie } from "@/src/setCookie";
import { getAuth } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";

export async function getServerSideProps(context) {
  const user = getUserFromCookie(context.req);
  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  // If the user is authenticated, return some data as props
  return {
    props: {
      data: 'Some data for authenticated users',
    },
  };
}

export default function HistoryQuiz() {
  const auth = getAuth(firebase_app);
  const user = auth.currentUser;
  const router = useRouter();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        // router.push("/login");
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
