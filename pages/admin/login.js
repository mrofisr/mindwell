import { LayoutAdmin } from "@/components/Layout";
import firebase_app from "@/src/firebase/config";
import { getCookie, setCookie } from "cookies-next";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export async function getServerSideProps({ req, res }) {
  const auth = getCookie("admin", { req, res });
  if (auth) {
    return {
      redirect: {
        destination: "/admin",
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

export default function LoginPage() {
  const db = getFirestore(firebase_app);
  const [dataAdmin, setAdmin] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const router = useRouter();
  useEffect(() => {
    const getAdmin = async () => {
      try {
        const docRef = doc(db, "admin", "16TCslUL2u1sYiDd8E4X");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setAdmin(docSnap.data());
        } else {
          console.log("Document does not exist");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAdmin();
  }, []);
  const CheckLogin = (username, password) => {
    if (username === dataAdmin.username && password === dataAdmin.password) {
      setCookie("admin", "true", { maxAge: 60 * 6 * 24 });
      router.push("/admin");
    } else {
      router.push("/admin/login");
    }
  };
  return (
    <>
      <LayoutAdmin>
        <div className="min-h-screen flex flex-col justify-center sm:py-12">
          <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
            <div className="flex justify-center my-6">
              <img src="/mindwell.png" className="w-1/2" />
            </div>
            <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
              <div className="px-5 py-7">
                <label className="font-semibold text-sm text-gray-600 pb-1 block">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  value={username}
                  onChange={handleUsernameChange}
                />
                <label className="font-semibold text-sm text-gray-600 pb-1 block">
                  Password
                </label>
                <input
                  type="password"
                  password="password"
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <button
                  type="button"
                  className="transition duration-200 bg-rose-400 focus:bg-rose-700 focus:shadow-sm text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block border-b-4 border-rose-500"
                  onClick={(e) => {
                    e.preventDefault;
                    CheckLogin(username, password);
                  }}
                >
                  <span className="inline-block mr-2">Login</span>
                </button>
              </div>
            </div>
            <div className="py-5">
              <div className="grid grid-cols-2 gap-1">
                <div className="text-center sm:text-left whitespace-nowrap">
                  <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-4 h-4 inline-block align-text-top"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    <a href="/" className="inline-block ml-1">
                      Back to mindwell.site
                    </a>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutAdmin>
    </>
  );
}
