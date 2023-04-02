import Navbar from "@/components/Navbar";
import firebase_app from "@/src/firebase/config";
import { getAuth } from "firebase/auth";
import Image from "next/image";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function Test() {
  const auth = getAuth(firebase_app);
  const user = auth.currentUser;
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        Swal.fire({
          icon: "error",
          title: "You must log in to view this page",
          showConfirmButton: true,
          timer: 2000,
          width: 350,
          heightAuto: true
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
        <Image
          src="/next.svg"
          className="object-center"
          width={100}
          height={33}
          alt="Logo"
        />
      </div>
      <Navbar />
    </>
  );
}
