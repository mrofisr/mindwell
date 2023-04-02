import Navbar from "@/components/Navbar";
import firebase_app from "@/src/firebase/config";
import { getAuth } from "firebase/auth";
import Image from "next/image";
import { useState, useEffect } from "react";
import Parser from "rss-parser";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";

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

async function getFeedData() {
  const parser = new Parser();
  const feed = await parser.parseURL("https://hilman.space/blog/index.xml");
  return feed.items.map((item) => ({
    title: item.title,
    link: item.link,
    pubDate: item.pubDate,
    guid: item.guid,
    description: item.contentSnippet,
  }));
}

const formatDate = (dateStr) => {
  const dateObj = new Date(dateStr);
  return format(dateObj, "EEEE, dd MMMM yyyy", { locale: id });
};

export default function Index({ feedData }) {
  const date = new Date();
  const auth = getAuth(firebase_app);
  const [user, setUser] = useState();
  const [visibleItems, setVisibleItems] = useState(feedData.slice(0, 3));
  const timeZoneoffset = 420; // Jakarta timezone offset in minutes
  const jakartaDate = new Date(date.getTime() + timeZoneoffset * 60 * 1000);
  const timeOfDay = getTimeOfDay(jakartaDate);
  const [quote, setQuote] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName } = user;
        setUser({ displayName });
      }
    });
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
          <span className="text-lg">
            Selamat {timeOfDay} {user?.displayName}
          </span>
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
          <Swiper className="w-full mx-auto">
            {visibleItems.map((item) => (
              <SwiperSlide
                className="w-full mx-auto rounded-lg bg-white shadow-lg px-5 pt-5 my-5 text-gray-800 border-1"
                key={item.guid}
              >
                <a
                  href={item.link}
                  className="flex item-center px-5 py-8 cursor-pointer"
                  target={"_blank"}
                >
                  <div className="w-5/6 ite">
                    <div className="mb-3">
                      <h2 className="text-lg font-bold capitalize">
                        {item.title}
                      </h2>
                      <span className="font-thin text-xs">
                        {formatDate(item.pubDate)}
                      </span>
                    </div>
                    <p className="text-sm text-justify truncate">
                      {item.description}
                    </p>
                    <span className="font-thin text-sm text-right">
                      Read more..
                    </span>
                  </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
          <Link className="text-right text-sm" href="/articles">Show more</Link>
        </div>
      </div>
      <Navbar />
    </>
  );
}

export async function getStaticProps() {
  const feedData = await getFeedData();
  return {
    props: {
      feedData,
    },
  };
}
