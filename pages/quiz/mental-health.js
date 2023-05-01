import firebase_app from "@/src/firebase/config";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Transition } from "@headlessui/react";
import TitlePage from "@/components/TitlePage";
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { getUserFromCookie } from "@/src/setCookie";

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

export default function MentalHealth() {
  const auth = getAuth(firebase_app);
  const user = auth.currentUser;
  const db = getFirestore(firebase_app);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gejala, setGejala] = useState([]);
  const [penyakit, setPenyakit] = useState([]);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
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
  const dbRef = collection(db, "results");
  const router = useRouter();
  const addResult = async (result) => {
    const data = {
      uid: "",
      result_id: "",
      penyakit: "",
      description: "",
    };
    await setDoc(doc(dbRef, user.uid), data);
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
          setCurrentIndex(0);
        });
        console.log(currentQuestion.yes);
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
          setCurrentIndex(0);
        });
        console.log(currentQuestion.no);
      }
    }
  };
  const handlePrev = () => {
    // Move to the previous question
    setCurrentIndex(currentQuestion.prev);
  };

  return (
    <div className="relative">
      <div className="mx-4 my-5">
        <div className="flex flex-col">
          {/* */}
          <TitlePage title={"Mental Health Quiz"} />
          <Transition
            show={!!currentQuestion}
            enter="transition-opacity duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-500"
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
  );
}
