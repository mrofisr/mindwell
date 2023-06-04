import firebase_app from "@/src/firebase/config";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Transition } from "@headlessui/react";
import TitlePage from "@/components/TitlePage";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import Image from "next/image";
import { deleteCookie, getCookie } from "cookies-next";
import { Layout } from "@/components/Layout";

export async function getServerSideProps({ req, res }) {
  const auth = getCookie("auth", { req, res });
  if (!auth) {
    return {
      redirect: {
        destination: "/login",
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

export default function MentalHealth() {
  const auth = getAuth(firebase_app);
  const user = auth.currentUser;
  const db = getFirestore(firebase_app);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gejala, setGejala] = useState([]);
  const [penyakit, setPenyakit] = useState([]);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (!authUser || !getCookie("auth")) {
        deleteCookie("auth");
        auth.signOut();
        router.push("/login");
      }
    });

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

  const currentQuestion = gejala[currentIndex];
  const dbRef = collection(db, "sistem-pakar");
  const router = useRouter();

  const addResult = async (result) => {
    const docRef = doc(db, "sistem-pakar", "mental-health");
    const docSnap = await getDoc(docRef);
    const docRefUser = doc(db, "users", user?.uid);
    const docSnapUser = await getDoc(docRefUser);
    if (docSnap.exists()) {
      if (!docSnap.data().result) {
        const data = {
          result: [
            {
              uid: user?.uid,
              result_id: Math.random().toString(36).substring(2, 16), // random id
              displayName: docSnapUser.data()?.displayName,
              faculty: docSnapUser.data()?.faculty,
              majority: docSnapUser.data()?.majority,
              year: docSnapUser.data()?.year,
              penyakit: result.name,
              description: result.description,
              createdAt: new Date(),
            },
          ],
        };
        await setDoc(doc(dbRef, "mental-health"), data, { merge: true });
      } else {
        const newData = {
          result: arrayUnion({
            uid: user?.uid,
            result_id: Math.random().toString(36).substring(2, 16), // random id
            displayName: docSnapUser.data()?.displayName,
            faculty: docSnapUser.data()?.faculty,
            majority: docSnapUser.data()?.majority,
            year: docSnapUser.data()?.year,
            penyakit: result.name,
            description: result.description,
            createdAt: new Date(),
          }),
        };
        await updateDoc(doc(dbRef, "mental-health"), newData);
      }
    } else {
      console.log("Document does not exist");
    }
  };

  const handleAnswer = (answer) => {
    // Move to the next question based on the answer chosen
    if (answer === "yes") {
      if (Number.isInteger(currentQuestion.yes)) {
        setCurrentIndex(currentQuestion.yes);
      } else {
        const result = penyakit.find((r) => r.code === currentQuestion.yes);
        Swal.fire({
          icon: "info",
          title: "Result",
          text: result.name,
          showConfirmButton: true,
          width: 350,
          heightAuto: true,
        }).then(() => {
          // Reset the quiz back to the beginning
          router.push("/quiz/history");
        });
        addResult(result);
      }
    } else if (answer === "no") {
      if (Number.isInteger(currentQuestion.no)) {
        setCurrentIndex(currentQuestion.no);
      } else {
        const result = penyakit.find((r) => r.code === currentQuestion.no);
        Swal.fire({
          icon: "info",
          title: "Result",
          text: result.name,
          showConfirmButton: true,
          width: 350,
          heightAuto: true,
        }).then(() => {
          // Reset the quiz back to the beginning
          router.push("/quiz/history");
        });
        addResult(result);
      }
    }
  };

  const handlePrev = () => {
    // Move to the previous question
    setCurrentIndex(currentQuestion.prev);
  };
  return (
    <Layout>
      <div className="relative">
        <div className="mx-4 my-5">
          <Image
            src="/mindwell.png"
            className="object-center"
            width={100}
            height={33}
            alt="Logo"
            onClick={() => router.push("/")}
          />
          <div className="flex flex-col">
            {/* */}
            <TitlePage title={"Mental Health Quiz"} />
            <Transition
              show={!!currentQuestion}
              enter="transition-all ease-in-out duration-500 delay-[200ms]"
              enterFrom="opacity-0 translate-y-6"
              enterTo="opacity-100 translate-y-0"
              leave="transition-all ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              {currentQuestion && (
                <div className="flex flex-col">
                  <h2 className="text-xl mb-4">{currentQuestion.question}</h2>
                  <p className="mb-4 text-gray-500">
                    Jawab untuk lanjut ke pertanyaan berikutnya
                  </p>
                  <div className="mt-10">
                    <button
                      className="mt-5 text-center w-full py-3.5 rounded-lg bg-rose-400 border-b-4 border-rose-500 text-white"
                      onClick={() => handleAnswer("yes")}
                    >
                      Yes
                    </button>
                    <button
                      className="mt-5 text-center w-full py-3.5 rounded-lg bg-rose-400 border-b-4 border-rose-500 text-white"
                      onClick={() => handleAnswer("no")}
                    >
                      No
                    </button>
                    {currentIndex !== 0 && (
                      <button
                        className="mt-40 text-center w-full py-3.5 rounded-lg bg-gray-400 border-b-4 border-gray-500 text-white"
                        onClick={() => {
                          handlePrev();
                        }}
                        disabled={currentQuestion.prev === 0}
                      >
                        Previous
                      </button>
                    )}
                  </div>
                </div>
              )}
            </Transition>
          </div>
        </div>
      </div>
    </Layout>
  );
}
