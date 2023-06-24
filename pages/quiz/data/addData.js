// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

// Initialize Firebase
let firebase_app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default function Node() {
  const db = getFirestore(firebase_app);
  const dbRef = collection(db, "sistem-pakar");
  const addData = async () => {
    const data = {
      gejala2: {
        G01: {
          nama_gejala: "",

        },

        G02: {
          nama_gejala: "",

        },

        G03: {
          nama_gejala: "",

        },

        G04: {
          nama_gejala: "",

        },

        G05: {
          nama_gejala: "",

        },

        G06: {
          nama_gejala: "",

        },

        G07: {
          nama_gejala: "",

        },

        G08: {
          nama_gejala: "",

        },

        G09: {
          nama_gejala: "",

        },

        G10: {
          nama_gejala: "",

        },

        G11: {
          nama_gejala: "",

        },

        G12: {
          nama_gejala: "",

        },

        G13: {
          nama_gejala: "",

        },

        G14: {
          nama_gejala: "",

        },

        G15: {
          nama_gejala: "",

        },

        G16: {
          nama_gejala: "",

        },

        G17: {
          nama_gejala: "",

        },

        G18: {
          nama_gejala: "",

        },

        G19: {
          nama_gejala: "",

        },

        G20: {
          nama_gejala: "",

        },

        G21: {
          nama_gejala: "",

        },

        G22: {
          nama_gejala: "",

        },

        G23: {
          nama_gejala: "",

        },

        G24: {
          nama_gejala: "",

        },

        G25: {
          nama_gejala: "",

        },

        G26: {
          nama_gejala: "",

        },

        G27: {
          nama_gejala: "",

        },

        G28: {
          nama_gejala: "",

        },

        G29: {
          nama_gejala: "",

        },

        G30: {
          nama_gejala: "",

        },

        G31: {
          nama_gejala: "",

        },

        G32: {
          nama_gejala: "",

        },

        G33: {
          nama_gejala: "",

        },

        G34: {
          nama_gejala: "",

        },

        G35: {
          nama_gejala: "",

        },

        G36: {
          nama_gejala: "",

        },

        G37: {
          nama_gejala: "",

        },

        G38: {
          nama_gejala: "",

        },

        G39: {
          nama_gejala: "",

        },

        G40: {
          nama_gejala: "",

        },

        G41: {
          nama_gejala: "",

        },

        G42: {
          nama_gejala: "",

        },

        G43: {
          nama_gejala: "",

        },

        G44: {
          nama_gejala: "",

        },
      },
    };

    await setDoc(doc(dbRef, "mental-health"), data, { merge: true });
  };
  const [gejala, setGejala] = useState([]);
  const [penyakit, setPenyakit] = useState([]);
  // useEffect(() => {
  //   const getData = async () => {
  //     const docRef = doc(db, "sistem-pakar", "mental-health");
  //     const docSnap = await getDoc(docRef);
  //     if (docSnap.exists()) {
  //       setGejala(docSnap.data().gejala);
  //       setPenyakit(docSnap.data().penyakit);
  //       // const filename = "data.json";
  //       // const contentType = "application/json;charset=utf-8;";
  //       // const data = JSON.stringify(docSnap.data().result);
  //       // const blob = new Blob([data], { type: contentType });
  //       // const url = URL.createObjectURL(blob);
  //       // const link = document.createElement("a");
  //       // link.href = url;
  //       // link.download = filename;
  //       // document.body.appendChild(link);
  //       // link.click();
  //       // document.body.removeChild(link);
  //       // URL.revokeObjectURL(url);
  //       console.log("Document data:", docSnap.data().result);
  //     } else {
  //       console.log("Document does not exist");
  //     }
  //   };
  //   getData();
  // }, []);
  return (
    <>
      <button onClick={addData}>Add Data</button>
    </>
  );
}
