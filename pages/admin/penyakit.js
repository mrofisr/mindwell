import { LayoutAdmin } from "@/components/Layout";
import SideBar from "@/components/Sidebar";
import firebase_app from "@/src/firebase/config";
import { getCookie } from "cookies-next";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";

export async function getServerSideProps({ req, res }) {
  const auth = getCookie("admin", { req, res });
  if (!auth) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

export default function AdminPage() {
  const db = getFirestore(firebase_app);
  const [penyakit, setPenyakit] = useState();
  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, "sistem-pakar", "mental-health");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPenyakit(docSnap.data().penyakit);
      } else {
        console.log("Document does not exist");
      }
    };
    getData();
  }, []);
  return (
    <>
      <LayoutAdmin>
        <SideBar />
      </LayoutAdmin>
    </>
  );
}
