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
          jawaban_iya: "",
          jawaban_tidak: "",
          jawaban_sebelumnya: "",
        },

        G02: {
          nama_gejala: "",
          jawaban_iya: "",
          jawaban_tidak: "",
          jawaban_sebelumnya: "",
        },

        G03: {
          nama_gejala: "",
          jawaban_iya: "",
          jawaban_tidak: "",
          jawaban_sebelumnya: "",
        },

        G04: {
          nama_gejala: "",
          jawaban_iya: "",
          jawaban_tidak: "",
          jawaban_sebelumnya: "",
        },

        G05: {
          nama_gejala: "",
          jawaban_iya: "",
          jawaban_tidak: "",
          jawaban_sebelumnya: "",
        },

        G06: {
          nama_gejala: "",
          jawaban_iya: "",
          jawaban_tidak: "",
          jawaban_sebelumnya: "",
        },

        G07: {
          nama_gejala: "",
          jawaban_iya: "",
          jawaban_tidak: "",
          jawaban_sebelumnya: "",
        },

        G08: {
          nama_gejala: "",
          jawaban_iya: "",
          jawaban_tidak: "",
          jawaban_sebelumnya: "",
        },

        G09: {
          nama_gejala: "",
          jawaban_iya: "",
          jawaban_tidak: "",
          jawaban_sebelumnya: "",
        },

        G10: {
          nama_gejala: "",
          jawaban_iya: "",
          jawaban_tidak: "",
          jawaban_sebelumnya: "",
        },

        G11: {
          nama_gejala: "",
          jawaban_iya: "",
          jawaban_tidak: "",
          jawaban_sebelumnya: "",
        },

        G12: {
          nama_gejala: "",
          jawaban_iya: "",
          jawaban_tidak: "",
          jawaban_sebelumnya: "",
        },

        G13: {
          nama_gejala: "",
          jawaban_iya: "",
          jawaban_tidak: "",
          jawaban_sebelumnya: "",
        },

        G14: {
          nama_gejala: "",
          jawaban_iya: "",
          jawaban_tidak: "",
          jawaban_sebelumnya: "",
        },

        G15: {
          nama_gejala: "",
          jawaban_iya: "",
          jawaban_tidak: "",
          jawaban_sebelumnya: "",
        },

        G16: {
          nama_gejala: "",
          jawaban_iya: "",
          jawaban_tidak: "",
          jawaban_sebelumnya: "",
        },

        G17: {
          nama_gejala: "",
          jawaban_iya: "",
          jawaban_tidak: "",
          jawaban_sebelumnya: "",
        },

        G18: {
          nama_gejala: "",
          jawaban_iya: "",
          jawaban_tidak: "",
          jawaban_sebelumnya: "",
        },

        G19: {
          nama_gejala: "",
          jawaban_iya: "",
          jawaban_tidak: "",
          jawaban_sebelumnya: "",
        },

        G20: {
          nama_gejala: "",
          jawaban_iya: "",
          jawaban_tidak: "",
          jawaban_sebelumnya: "",
        },

        G21: {
          nama_gejala: "",
          jawaban_iya: "",
          jawaban_tidak: "",
          jawaban_sebelumnya: "",
        },

        G22: {
          nama_gejala: "",
          jawaban_iya: "",
          jawaban_tidak: "",
          jawaban_sebelumnya: "",
        },

        G23: {
          nama_gejala: "",
          jawaban_iya: "",
          jawaban_tidak: "",
          jawaban_sebelumnya: "",
        },

        G24: {
          nama_gejala: "",
          jawaban_iya: "",
          jawaban_tidak: "",
          jawaban_sebelumnya: "",
        },

        G25: {
          nama_gejala: "",
          jawaban_iya: "",
          jawaban_tidak: "",
          jawaban_sebelumnya: "",
        },

        G26: {
          nama_gejala: "",
          jawaban_iya: "",
          jawaban_tidak: "",
          jawaban_sebelumnya: "",
        },

        G27: {
          nama_gejala: "",
          jawaban_iya: "",
          jawaban_tidak: "",
          jawaban_sebelumnya: "",
        },

        G28: {
          nama_gejala: "",
          jawaban_iya: "",
          jawaban_tidak: "",
          jawaban_sebelumnya: "",
        },

        G29: {
          nama_gejala: "",
          jawaban_iya: "",
          jawaban_tidak: "",
          jawaban_sebelumnya: "",
        },

        G30: {
          nama_gejala: "",
          jawaban_iya: "",
          jawaban_tidak: "",
          jawaban_sebelumnya: "",
        },

        G31: {
          nama_gejala: "",
          jawaban_iya: "",
          jawaban_tidak: "",
          jawaban_sebelumnya: "",
        },

        G32: {
          nama_gejala: "",
          jawaban_iya: "",
          jawaban_tidak: "",
          jawaban_sebelumnya: "",
        },

        G33: {
          nama_gejala: "",
          jawaban_iya: "",
          jawaban_tidak: "",
          jawaban_sebelumnya: "",
        },

        G34: {
          nama_gejala: "",
          jawaban_iya: "",
          jawaban_tidak: "",
          jawaban_sebelumnya: "",
        },

        G35: {
          nama_gejala: "",
          jawaban_iya: "",
          jawaban_tidak: "",
          jawaban_sebelumnya: "",
        },

        G36: {
          nama_gejala: "",
          jawaban_iya: "",
          jawaban_tidak: "",
          jawaban_sebelumnya: "",
        },

        G37: {
          nama_gejala: "",
          jawaban_iya: "",
          jawaban_tidak: "",
          jawaban_sebelumnya: "",
        },

        G38: {
          nama_gejala: "",
          jawaban_iya: "",
          jawaban_tidak: "",
          jawaban_sebelumnya: "",
        },

        G39: {
          nama_gejala: "",
          jawaban_iya: "",
          jawaban_tidak: "",
          jawaban_sebelumnya: "",
        },

        G40: {
          nama_gejala: "",
          jawaban_iya: "",
          jawaban_tidak: "",
          jawaban_sebelumnya: "",
        },

        G41: {
          nama_gejala: "",
          jawaban_iya: "",
          jawaban_tidak: "",
          jawaban_sebelumnya: "",
        },

        G42: {
          nama_gejala: "",
          jawaban_iya: "",
          jawaban_tidak: "",
          jawaban_sebelumnya: "",
        },

        G43: {
          nama_gejala: "",
          jawaban_iya: "",
          jawaban_tidak: "",
          jawaban_sebelumnya: "",
        },

        G44: {
          nama_gejala: "",
          jawaban_iya: "",
          jawaban_tidak: "",
          jawaban_sebelumnya: "",
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
