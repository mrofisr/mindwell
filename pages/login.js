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
import { setUserCookie } from "@/src/setCookie";
import { useEffect } from "react";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const { req } = context;
  const cookies = req.headers.cookie;
  if (cookies) {
    // If the user is not signed in, redirect to the login page
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  // If the user is signed in, return an empty props object
  return { props: {} };
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
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);
      const newUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoUrl: user.photoURL,
        createdAt: serverTimestamp(),
        accessToken: user.accessToken,
      };
      setUserCookie(JSON.stringify(newUser));
      if (!userDoc.exists()) {
        // If the user doesn't exist, create a new user document in Firestore
        try {
          await setDoc(doc(collection(db, "users"), user.uid), newUser);
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
        router.push("/");
      } 
    });
  }, []);
  SwiperCore.use([Pagination]);
  return (
    <>
      <div className="mx-4 my-5">
        <Image
          src="/next.svg"
          className="object-center"
          width={100}
          height={33}
          alt="Logo"
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
                <h1 className="mt-4 text-xl font-bold">
                  Mental Health Test
                </h1>
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
                  Read Articles about Mental Health
                </h1>
                <p className="mb-28 mt-1  text-[14px] font-[50]">
                  Learn about mental health through articles.
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
          className="py-3 w-full mt-20 font-semibold text-gray-900 bg-white border-2 border-gray-500 rounded-md shadow outline-none hover:bg-blue-50 hover:border-blue-400 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline w-4 h-4 mr-3 text-gray-900 fill-current"
            viewBox="0 0 48 48"
            width="48px"
            height="48px"
          >
            <path
              fill="#fbc02d"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20 s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
            <path
              fill="#e53935"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039 l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            ></path>
            <path
              fill="#4caf50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            ></path>
            <path
              fill="#1565c0"
              d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
          </svg>
          Sign in with Google
        </button>
      </div>
    </>
  );
}
