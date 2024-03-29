import { Layout } from "@/components/Layout";
import Navbar from "@/components/Navbar";
import TitlePage from "@/components/TitlePage";
import firebase_app from "@/src/firebase/config";
import { deleteCookie, getCookie } from "cookies-next";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
  return {
    props: {
      data: "Some data for authenticated users",
    },
  };
}

export default function Test() {
  const auth = getAuth(firebase_app);
  const router = useRouter();
  const db = getFirestore(firebase_app);
  const [user, setUser] = useState();
  const fetchUser = async (uid) => {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUser(docSnap.data());
      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (!authUser || !getCookie("auth")) {
        deleteCookie("auth");
        auth.signOut();
        router.push("/login");
      } else {
        fetchUser(authUser.uid);
      }
    });
  }, []);
  useEffect(() => {
    if (user) {
      if (!user.faculty || !user.majority || !user.year) {
        router.push("/profile" + `/${user.uid}`);
      }
    }
  }, [user]);
  return (
    <>
      <Layout>
        <div className="mx-4 my-5">
          <Image
            src="/mindwell.png"
            className="object-center"
            width={100}
            height={33}
            alt="Logo"
            onClick={() => router.push("/")}
          />
          <div className="flex flex-col">
            <TitlePage title={"Pick your test"} />
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
                    A mental health test is a brief assessment tool designed to
                    help individuals identify potential symptoms or signs of
                    mental health concerns.
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
        <Navbar />
      </Layout>
    </>
  );
}
