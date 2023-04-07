import firebase_app from "@/src/firebase/config";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import quizData from "@/pages/quiz/data/quizData.json";
import Swal from "sweetalert2";
import TitlePage from "@/components/TitlePage";

export default function MentalHealth() {
  const auth = getAuth(firebase_app);
  const user = auth.currentUser;
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQuestion = quizData.questions[currentIndex];

  const handleAnswer = (answer) => {
    // Move to the next question based on the answer chosen
    if (answer === "yes") {
      setCurrentIndex(currentQuestion.yes);
    } else if (answer === "no") {
      setCurrentIndex(currentQuestion.no);
    } else {
      // Handle invalid answer
    }
  };
  const handlePrev = () => {
    // Move to the previous question
    setCurrentIndex(currentQuestion.prev);
  };
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        Swal.fire({
          icon: "error",
          title: "You must log in to view this page",
          showConfirmButton: true,
          timer: 2000,
          width: 350,
          heightAuto: true,
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
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-4xl font-bold mb-8">Quiz</h1>
          {currentQuestion && (
            <div className="flex flex-col items-center">
              <h2 className="text-2xl mb-4">{currentQuestion.question}</h2>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
                onClick={() => handleAnswer("yes")}
              >
                Yes
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2 w-full"
                onClick={() => handleAnswer("no")}
              >
                No
              </button>
              {currentIndex !== 0 && (
                <button
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mt-4 w-full"
                  onClick={handlePrev}
                  disabled={currentQuestion.prev === 0}
                >
                  Previous
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
