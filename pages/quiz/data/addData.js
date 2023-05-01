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
      gejala: [
        {
          question: "Sulit berkonsentrasi dan teralih perhatian dengan mudah",
          yes: 1,
          no: 1,
        },
        {
          question:
            "Kesulitan tidur dan terbangun terlalu cepat atau terlalu lama",
          yes: 2,
          no: 2,
          prev: 0,
        },
        {
          question: "Merasa lelah dan lesu sepanjang waktu",
          yes: 3,
          no: 20,
          prev: 1,
        },
        {
          question: "Emosi yang sering berubah-ubah dengan mudah",
          yes: 4,
          no: 10,
          prev: 2,
        },
        {
          question:
            "Kehilangan minat dan kegembiraan pada hal-hal yang biasa dinikmati",
          yes: 5,
          no: "P01",
          prev: 3,
        },
        {
          question: "Kurang percaya diri dan merasa tidak berharga",
          yes: 6,
          no: 6,
          prev: 4,
        },
        {
          question:
            "Sering merasa bersalah dan tidak berguna tanpa alasan yang jelas",
          yes: 7,
          no: "P01",
          prev: 5,
        },
        {
          question: "Melihat masa depan dengan pesimisme dan putus asa",
          yes: 8,
          no: 8,
          prev: 6,
        },
        {
          question:
            "Munculnya niat untuk menyakiti diri sendiri atau bahkan bunuh diri",
          yes: 9,
          no: "P02",
          prev: 7,
        },
        {
          question:
            "Nafsu makan yang tidak terkontrol, seperti terlalu banyak atau terlalu sedikit",
          yes: "P03",
          no: "P03",
          prev: 8,
        },
        {
          question:
            "Terus-menerus merasa cemas, takut, dan menghindar dari situasi tertentu selama lebih dari 6 bulan",
          yes: 11,
          no: 11,
          prev: 3,
        },
        {
          question: "Berlebihan memikirkan situasi yang belum tentu terjadi",
          yes: 12,
          no: "P01",
          prev: 10,
        },
        {
          question:
            "Mudah tersinggung, gelisah, dan gugup dalam situasi sosial",
          yes: 13,
          no: 13,
          prev: 11,
        },
        {
          question: "Kesulitan dalam membuat keputusan atau mengambil tindakan",
          yes: 14,
          no: "P04",
          prev: 12,
        },
        {
          question: "Mengalami sakit kepala yang sering dan berulang",
          yes: 15,
          no: 15,
          prev: 13,
        },
        {
          question: "Tubuh gemetaran tanpa sebab yang jelas",
          yes: 16,
          no: 16,
          prev: 14,
        },
        {
          question:
            "Mengalami keringat berlebihan dalam situasi yang tidak memerlukannya",
          yes: 17,
          no: 17,
          prev: 15,
        },
        {
          question: "Merasa mual terus menerus",
          yes: 18,
          no: "P05",
          prev: 16,
        },
        {
          question:
            "Mengalami sakit perut, diare, atau masalah pencernaan lainnya tanpa sebab yang jelas",
          yes: 19,
          no: 19,
          prev: 17,
        },
        {
          question: "Mudah merasa marah dan sulit mengendalikan emosi",
          yes: "P06",
          no: "P06",
          prev: 18,
        },
        {
          question:
            "Menghindari kontak dengan lingkungan sekitar atau orang lain secara berlebihan",
          yes: 21,
          no: "P01",
          prev: 2,
        },
        {
          question: "Kesulitan membedakan kenyataan dan halusinasi",
          yes: 22,
          no: "P07",
          prev: 20,
        },
        {
          question:
            "Mendengar, melihat, mencium, atau merasakan sesuatu yang tidak nyata",
          yes: 26,
          no: 23,
          prev: 21,
        },
        {
          question:
            "Kesulitan mempertahankan pola pikir yang teratur atau berkonsentrasi pada tugas-tugas tertentu",
          yes: 24,
          no: 24,
          prev: 22,
        },
        {
          question:
            "Perilaku yang berubah-ubah dan tidak sesuai dengan karakteristik asli seseorang",
          yes: 25,
          no: "P07",
          prev: 23,
        },
        {
          question: "Tidak menunjukkan emosi dan bersikap monoton",
          yes: "P09",
          no: "P09",
          prev: 25,
        },
        {
          question:
            "Sulit merasa senang atau puas dengan kehidupan yang dijalani",
          yes: 27,
          no: 27,
          prev: 22,
        },
        {
          question:
            "Tidak peduli dengan penampilan diri sendiri atau kebersihan diri",
          yes: 28,
          no: 28,
          prev: 26,
        },
        {
          question:
            "Enggan untuk memulai percakapan dengan orang lain dan merasa tidak nyaman dalam situasi sosial",
          yes: 29,
          no: "P07",
          prev: 27,
        },
        {
          question:
            "Kesulitan dalam memori dan mengalami kelupaan dengan frekuensi yang sering",
          yes: "P08",
          no: "P08",
          prev: 28,
        },
      ],
    };
    await setDoc(doc(dbRef, "mental-health"), data, { merge: true });
  };
  const [gejala, setGejala] = useState([]);
  const [penyakit, setPenyakit] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, "sistem-pakar", "mental-health");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setGejala(docSnap.data().gejala);
        setPenyakit(docSnap.data().penyakit);
      } else {
        console.log("Document does not exist");
      }
    };
    getData();
  }, []);
  return (
    <>
      <button onClick={addData}>Add Data</button>
    </>
  );
}
