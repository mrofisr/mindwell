import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useState, useEffect } from "react";

const getTimeOfDay = (date) => {
  const hours = date.getHours();
  if (hours >= 5 && hours < 11) {
    return "Pagi";
  } else if (hours >= 11 && hours < 16) {
    return "Siang";
  } else if (hours >= 16 && hours < 21) {
    return "Sore";
  } else {
    return "Malam";
  }
};

// export async function getServerSideProps(context) {
//   const { req } = context;
//   const cookies = req.headers.cookie;
//   if (!cookies) {
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

export default function Index() {
  const date = new Date();
  const timeZoneoffset = 420; // Jakarta timezone offset in minutes
  const jakartaDate = new Date(date.getTime() + timeZoneoffset * 60 * 1000);
  const timeOfDay = getTimeOfDay(jakartaDate);
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    async function fetchQuote() {
      const res = await fetch(
        "https://api.quotable.io/random?tags=happiness|life|love|self|wisdom"
      );
      const data = await res.json();
      setQuote(data);
    }

    fetchQuote();
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
        <div className="flex flex-col">
          <span className="text-lg">Selamat {timeOfDay} Rofi</span>
          <span className="text-base font-thin text-gray-500 mt-10">
            Quotes of the day
          </span>
          <div className="w-full mx-auto rounded-lg bg-white shadow-lg px-5 pt-5 my-5 text-gray-800 border-1">
            {quote ? (
              <div className="w-full mb-4">
                <p className="text-md text-gray-600 px-5 italic font-thin">
                  "{quote.content}"
                </p>
                <p className="text-sm text-indigo-500 font-regular px-5">
                  - {quote.author}
                </p>
              </div>
            ) : (
              <div className="w-full mb-4">
                <p className="text-sm text-gray-600 px-5 italic font-thin">
                  Loading...
                </p>
              </div>
            )}
          </div>
          <span className="text-base font-thin text-gray-500">
            Articles for today{" "}
          </span>
        </div>
      </div>
      <Navbar />
    </>
  );
}
