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
  const [currentQuestion, setCurrentQuestion] = useState();
  const [gejala, setGejala] = useState({});
  const [penyakit, setPenyakit] = useState({});
  const [rules, setRules] = useState({});
  const [answers, setAnswers] = useState({});
  const [yesAnswers, setYesAnswers] = useState([]);
  const matchingObjects = {};
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
        setGejala(docSnap.data().gejala2);
        setPenyakit(docSnap.data().penyakit2);
        setRules(docSnap.data().rules);
        const gejalaData = docSnap.data().gejala2;
        setCurrentQuestion(gejalaData["G01"]);
      } else {
        console.log("Document does not exist");
      }
    };
    getData();
  }, [auth]);
  const dbRef = collection(db, "sistem-pakar");
  const router = useRouter();
  const addResult = async (result) => {
    const docRef = doc(db, "sistem-pakar", "mental-health");
    const docSnap = await getDoc(docRef);
    const docRefUser = doc(db, "users", user?.uid);
    const docSnapUser = await getDoc(docRefUser);
    if (docSnap.exists()) {
      const penyakitData = penyakit[result] ?? {};
      const namaPenyakit = penyakitData.nama ?? "Tidak teridentifikasi";
      const deskripsiPenyakit =
        penyakitData.deskripsi ?? "Tidak teridentifikasi";
      const penyebabPenyakit = penyakitData.penyebab ?? "Tidak teridentifikasi";
      const solusiPenyakit = penyakitData.solusi ?? "Tidak teridentifikasi";
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
              id_penyakit: result ?? "Tidak teridentifikasi",
              nama_penyakit: namaPenyakit,
              deskripsi: deskripsiPenyakit,
              penyebab: penyebabPenyakit,
              solusi: solusiPenyakit,
              user_answers: answers,
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
            id_penyakit: result ?? "Tidak teridentifikasi",
            nama_penyakit: namaPenyakit,
            deskripsi: deskripsiPenyakit,
            penyebab: penyebabPenyakit,
            solusi: solusiPenyakit,
            user_answers: answers,
            createdAt: new Date(),
          }),
        };
        await updateDoc(doc(dbRef, "mental-health"), newData);
      }
    } else {
      console.log("Document does not exist");
    }
  };
  const currentQuestionKey = Object.keys(gejala)
    .sort()
    .find((key) => gejala[key].nama_gejala === currentQuestion?.nama_gejala);
  const gejalaKeys = Object.keys(gejala).sort();
  const currentIndex = gejalaKeys.indexOf(currentQuestionKey);
  const handleAnswer = (answer) => {
    if (currentIndex < gejalaKeys.length - 1) {
      // Move to the next question
      const nextQuestionKey = gejalaKeys[currentIndex + 1];
      setCurrentQuestion(gejala[nextQuestionKey]);
      const updatedAnswers = {
        [currentQuestionKey]: answer,
        [nextQuestionKey]: answer,
      };
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        ...updatedAnswers,
      }));
    }
    if (currentIndex === gejalaKeys.length - 1) {
      for (const ruleKey in rules) {
        if (rules.hasOwnProperty(ruleKey)) {
          const item = rules[ruleKey];
          const isEqual =
            JSON.stringify(item.id_gejala) === JSON.stringify(yesAnswers);
          if (isEqual) {
            matchingObjects[ruleKey] = item;
            console.log(matchingObjects[ruleKey]);
            console.log(item.id_gejala);
            console.log(rules[ruleKey].id_penyakit);
            console.log(
              "Anda mengalami: ",
              penyakit[rules[ruleKey].id_penyakit].nama
            );
            Swal.fire({
              title: "Hasil",
              text: `Anda mengalami ${
                penyakit[rules[ruleKey].id_penyakit].nama
              }`,
              icon: "info",
              timer: 1000,
              heightAuto: true,
              width: 350,
              showCancelButton: false,
              showConfirmButton: false,
              showCloseButton: false,
            }).then(() => {
              router.push("/quizzes/history");
            });
            addResult(rules[ruleKey].id_penyakit);
            break;
          } else {
            matchingObjects[ruleKey] = item;
            console.log(matchingObjects[ruleKey]);
            console.log(item.id_gejala);
            console.log(rules[ruleKey].id_penyakit);
            console.log(
              "Anda mengalami: ",
              penyakit[rules[ruleKey].id_penyakit].nama
            );
            Swal.fire({
              title: "Hasil",
              text: `Gejala anda belum teridentifikasi`,
              icon: "info",
              timer: 1000,
              heightAuto: true,
              width: 350,
              showCancelButton: false,
              showConfirmButton: false,
              showCloseButton: false,
            }).then(() => {
              router.push("/quizzes/history");
            });
            addResult("Tidak teridentifikasi");
            break;
          }
        }
      }
    }
  };
  useEffect(() => {
    setYesAnswers(Object.keys(answers).filter((key) => answers[key] === "yes"));
  }, [answers]);
  console.log("yesAnswers: ", yesAnswers);
  return (
    <Layout>
      <div className="mx-4 my-5 flex flex-col">
        <Image
          src="/mindwell.png"
          className="object-center"
          width={100}
          height={33}
          alt="Logo"
          onClick={() => router.push("/")}
        />
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
            <div className="flex-grow">
              <div className="flex flex-col h-full">
                <p className="text-xl mb-4 lowercase">
                  {currentQuestion.nama_gejala}
                </p>
                <div className="flex-grow relative">
                  <div className="flex flex-col h-full bottom-0">
                    <div className="mb-5">
                      <button
                        className="text-center w-full py-3.5 rounded-lg bg-rose-400 border-b-4 border-rose-500 text-white"
                        onClick={() => handleAnswer("yes")}
                      >
                        Yes
                      </button>
                    </div>
                    <div className="mb-5">
                      <button
                        className="text-center w-full py-3.5 rounded-lg bg-rose-400 border-b-4 border-rose-500 text-white"
                        onClick={() => handleAnswer("no")}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Transition>
      </div>
    </Layout>
  );
}
