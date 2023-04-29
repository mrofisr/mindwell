import firebase_app from "@/src/firebase/config";
import { getAuth } from "firebase/auth";
import Image from "next/image";
import { useEffect } from "react";

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
