import Navbar from "@/components/Navbar";
import firebase_app from "@/src/firebase/config";
import { getUserFromCookie, removeUserCookie } from "@/src/setCookie";
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

export default function Profile() {
  const router = useRouter();
  const auth = getAuth(firebase_app);
  const db = getFirestore(firebase_app);
  const [user, setUser] = useState();
  const [open, setOpen] = useState(false);
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
  const logout = () => {
    removeUserCookie();
    auth.signOut();
  };
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        router.push("/login");
      } else {
        fetchUser(authUser.uid);
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
        <div
          className="relative flex-shrink-0 flex justify-end"
          onClick={() => setOpen(!open)}
          onBlur={() => setOpen(false)}
          tabIndex="0"
        >
          <button
            className={
              "text-gray-400 hover:text-gray-500 rounded-full focus:outline-none focus-within:ring-2 " +
              (open ? "bg-gray-100 text-gray-500" : "")
            }
            aria-haspopup="true"
            aria-expanded={open}
          >
            <span className="sr-only">Menu</span>
            <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
              <circle cx="16" cy="16" r="2" />
              <circle cx="10" cy="16" r="2" />
              <circle cx="22" cy="16" r="2" />
            </svg>
          </button>
          <div
            className={
              "origin-top-right z-10 absolute top-full right-0 min-w-[9rem] bg-white border border-gray-200 py-1.5 rounded shadow-lg overflow-hidden mt-1 " +
              (open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2")
            }
            onClick={() => setOpen(false)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setOpen(false);
            }}
            tabIndex="0"
            aria-hidden={!open}
          >
            <ul>
              <li>
                <a
                  className="font-medium text-sm text-gray-600 hover:text-gray-800 flex py-1 px-3"
                  href={"/profile/" + user?.uid}
                  onClick={() => setOpen(false)}
                >
                  Edit Profile
                </a>
              </li>
              <li>
                <p
                  className="font-medium text-sm text-red-500 hover:text-red-600 flex py-1 px-3"
                  onClick={() => {
                    setOpen(false);
                    logout();
                  }}
                >
                  Logout
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap justify-center mt-10">
          <div className="w-full flex justify-center">
            <div className="relative">
              <img
                src={user?.photoUrl}
                className="shadow-xl rounded-full align-middle border-none object-cover w-28 h-28 rounded-full"
              />
            </div>
          </div>
          <div className="w-full text-center pt-4">
            <h3 className="text-lg text-slate-700 font-bold leading-normal mb-1 uppercase">
              {user?.displayName}
            </h3>
            <div className="text-xs mt-0 mb-2 text-slate-400 ">
              {user?.majority + "," + user?.year}
            </div>
          </div>
          <div className="w-full flex flex-col">
            <a
              href="/quiz/history"
              className="mt-5 text-center w-full py-3.5 rounded-lg bg-rose-400   border-b-4 border-rose-500 text-white"
            >
              Quiz Results
            </a>
            <div className="mt-10 flex flex-wrap justify-center">
              <button
                onClick={() => {
                  console.log(process.env.BASE_URL)
                  if (navigator.share) {
                    navigator
                      .share({
                        title: "Share this website",
                        url: process.env.BASE_URL,
                        text: "Yuk cek kesehatan mental mu dengan menggunakan MindWell. Yuk bisa klik link dibawa 👇👇👇\n",
                      })
                      .then(() => console.log("Shared successfully"))
                      .catch((error) => console.log("Error sharing", error));
                  } else {
                    console.log("Web Share API not supported on this browser");
                  }
                }}
                className="text-white rounded-full px-1 py-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M5.5 15a3.51 3.51 0 0 0 2.36-.93l6.26 3.58a3.06 3.06 0 0 0-.12.85 3.53 3.53 0 1 0 1.14-2.57l-6.26-3.58a2.74 2.74 0 0 0 .12-.76l6.15-3.52A3.49 3.49 0 1 0 14 5.5a3.35 3.35 0 0 0 .12.85L8.43 9.6A3.5 3.5 0 1 0 5.5 15zm12 2a1.5 1.5 0 1 1-1.5 1.5 1.5 1.5 0 0 1 1.5-1.5zm0-13A1.5 1.5 0 1 1 16 5.5 1.5 1.5 0 0 1 17.5 4zm-12 6A1.5 1.5 0 1 1 4 11.5 1.5 1.5 0 0 1 5.5 10z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Navbar />
    </>
  );
}
