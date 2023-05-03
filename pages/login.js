import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper";
import Image from "next/image";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  setDoc,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import firebase_app from "@/src/firebase/config";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { getCookie, setCookie } from "cookies-next";
import {Layout} from "@/components/Layout";

export async function getServerSideProps({ req, res }) {
  const auth = getCookie("auth", { req, res });
  if (auth) {
    return {
      redirect: {
        destination: "/",
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

export default function Login() {
  const router = useRouter();
  const auth = getAuth(firebase_app);
  const db = getFirestore(firebase_app);
  const provider = new GoogleAuthProvider();
  const handleSignIn = async () => {
    try {
      const { user } = await signInWithPopup(auth, provider);
      // Check if the user already exists in Firestore
      const userRef = doc(db, "users", user?.uid);
      const userDoc = await getDoc(userRef);
      const newUser = {
        uid: user?.uid,
        email: user?.email,
        displayName: user?.displayName,
        photoUrl: user?.photoURL,
        faculty: "",
        majority: "",
        year: "",
        createdAt: serverTimestamp(),
        accessToken: user?.accessToken,
      };
      setCookie("auth", newUser?.accessToken, { maxAge: 60 * 6 * 24 });
      if (!userDoc.exists()) {
        // If the user doesn't exist, create a new user document in Firestore
        try {
          await setDoc(doc(collection(db, "users"), user?.uid), newUser);
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log("Login success");
        router.push("/");
      }
    });
  }, []);
  SwiperCore.use([Pagination]);
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
          <Swiper pagination={true} className="mySwiper ">
            <SwiperSlide>
              <div className="w-full h-full pt-16">
                <img
                  src="ilustrations/login/2.svg"
                  className="mx-auto h-52 w-52"
                  alt="Illustration"
                />
                <div className="text-center">
                  <h1 className="mt-4 text-xl font-bold">Mental Health Test</h1>
                  <p className="mb-28 mt-1  text-[14px] font-[50]">
                    Assess emotional and psychological well-being.
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-full h-full pt-16">
                <img
                  src="ilustrations/login/3.svg"
                  className="mx-auto h-52 w-52"
                  alt="Illustration"
                />
                <div className="text-center">
                  <h1 className="mt-4 text-xl font-bold">
                    Read Articles to boost Mental Health
                  </h1>
                  <p className="mb-28 mt-1  text-[14px] font-[50]">
                    Learn to boost mental health through articles.
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-full h-full pt-16">
                <img
                  src="ilustrations/login/4.svg"
                  className="mx-auto h-52 w-52"
                  alt="Illustration"
                />
                <div className="text-center">
                  <h1 className="mt-4 text-xl font-bold">
                    Track Your Mental Health
                  </h1>
                  <p className="mb-28 mt-1 text-[14px] font-[50]">
                    Monitor mental health progress regularly.
                  </p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
          <button
            onClick={handleSignIn}
            className="py-3 w-full mt-20 font-semibold text-gray-900 bg-white border-2 border-gray-500 rounded-md shadow outline-none"
          >
            <FcGoogle className="inline w-6 h-6 mr-3" />
            Sign in with Google
          </button>
        </div>
      </Layout>
    </>
  );
}
