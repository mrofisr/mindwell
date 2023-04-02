import Navbar from "@/components/Navbar";
import firebase_app from "@/src/firebase/config";
import { getAuth } from "firebase/auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Profile() {
  const auth = getAuth(firebase_app);
  const [user, setUser] = useState();

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
      } else {
        Swal.fire({
          icon: "error",
          title: "You must log in to view this page",
          showConfirmButton: true,
          timer: 2000,
        }).then(() => {
          // Redirect the user to the login page
          window.location.href = "/login";
        });
      }
    });
  }, []);
  return (
    <>
      <div className="mx-4 my-5">
        <div className="flex flex-wrap justify-center mt-[95px]">
          <div className="w-full flex justify-center">
            <div className="relative">
              <img
                src=""
                className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
              />
            </div>
          </div>
          <div className="w-full text-center mt-20 pt-8">
            <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1">
              {}
            </h3>
            <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
              <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>
              Paris, France
            </div>
          </div>
          <div className="w-full flex flex-col">
            <div className="flex flex-wrap justify-center">
              <Link
                href={"/profile/"}
                className="bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full"
              >
                Update Profile
              </Link>
            </div>
            <Link
              href="/quiz/history"
              className="mt-10 text-center w-full py-3.5 rounded-lg bg-blue-500 hover:bg-blue-700 text-white"
            >
              Quiz Results
            </Link>
            <div className="mt-10 flex flex-wrap justify-center">
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator
                      .share({
                        title: "Share this website",
                        url: "https://mindwell.site",
                        text: "Yuk cek kesehatan mental mu dengan menggunakan MindWell. Yuk bisa klik link dibawa 👇👇👇\n",
                      })
                      .then(() => console.log("Shared successfully"))
                      .catch((error) => console.log("Error sharing", error));
                  } else {
                    console.log("Web Share API not supported on this browser");
                  }
                }}
                // href="/quiz/history"
                className="text-white rounded-full border-2 px-1 py-1"
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
