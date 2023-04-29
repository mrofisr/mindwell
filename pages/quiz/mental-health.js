import firebase_app from "@/src/firebase/config";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import quizData from "@/pages/quiz/data/quizData.json";
import Swal from "sweetalert2";
import { Transition } from "@headlessui/react";

// export async function getServerSideProps(context) {
//   const { req } = context;
//   const cookies = req.headers.cookie;
//   if (cookies) {
//     // If the user is not signed in, redirect to the login page
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     };
//   }
//   // If the user is signed in, return an empty props object
//   return { props: {} };
// }

export default function MentalHealth() {
  const auth = getAuth(firebase_app);
  const user = auth.currentUser;
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQuestion = quizData.questions[currentIndex];

  const handleAnswer = (answer) => {
    // Move to the next question based on the answer chosen
    if (answer === "yes") {
      if (Number.isInteger(currentQuestion.yes)) {
        setCurrentIndex(currentQuestion.yes);
      } else {
        const result = quizData.results.find(
          (r) => r.code === currentQuestion.yes
        );
        Swal.fire({
          icon: "info",
          title: "Result",
          text: result.description,
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
        const result = quizData.results.find(
          (r) => r.code === currentQuestion.no
        );
        Swal.fire({
          icon: "info",
          title: "Result",
          text: result.description,
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
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        window.location.href = "/login";
      }
    });
  }, []);
  return (
    <>
      <div className="mx-4 my-5">
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-4xl font-bold mb-8">Quiz</h1>
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
          </Transition>
        </div>
      </div>
    </>
  );
}
