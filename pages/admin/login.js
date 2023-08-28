import { LayoutAdmin } from "@/components/Layout";
import firebase_app from "@/src/firebase/config";
import { getCookie, setCookie } from "cookies-next";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

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
      Swal.fire({
        title: "Failed",
        text: "Login gagal",
        icon: "error",
        timer: 1000,
        heightAuto: true,
        width: 350,
        showCancelButton: false,
        showConfirmButton: false,
        showCloseButton: false,
      }).then(() => router.push("/admin/login"));
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
          </div>
        </div>
      </LayoutAdmin>
    </>
  );
}
