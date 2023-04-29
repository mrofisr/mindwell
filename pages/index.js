import Navbar from "@/components/Navbar";
import firebase_app from "@/src/firebase/config";
import { getAuth } from "firebase/auth";
import Image from "next/image";
import { useState, useEffect } from "react";
import Parser from "rss-parser";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

// Crete a function to get the time of day in Jakarta
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
  const date = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" })
  );
  const auth = getAuth(firebase_app);
  const [user, setUser] = useState();
  const [visibleItems, setVisibleItems] = useState(feedData.slice(0, 5));
  const timeOfDay = getTimeOfDay(date);
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
        "https://api.quotable.io/random?tags=happiness|life|love|self|wisdom&minLength=100&maxLength=130"
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
          src="/mindwell.png"
          className="object-center"
          width={100}
          height={33}
          alt="Logo"
        />
        <div className="flex flex-col">
          <span className="text-xl mt-8">
            Selamat {timeOfDay},{" "}
            <span className="text-rose-500 font-bold">
              {user?.displayName ?? "Teman"}!
            </span>
          </span>
          <span className="text-base text-gray-800 mt-10 font-semibold">
            Quotes of the day
          </span>
          <div className="w-full mx-auto rounded-lg bg-rose-200 px-5 pt-5 my-5 shadow-md">
            {quote ? (
              <div className="w-full mb-4">
                <p className="text-md text-gray-800 text-justify px-5 italic font-normal">
                  "{quote.content}"
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
          <span className="text-base text-gray-800 font-semibold">
            Articles for today{" "}
          </span>
          <Swiper
            className="w-full"
            slidesPerView={"auto"}
            spaceBetween={30}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            navigation={true}
            modules={[Autoplay]}
          >
            {visibleItems.map((item) => (
              <SwiperSlide key={item.guid}>
                <div
                  className="w-full rounded-lg bg-white px-5 py-5 my-5 text-gray-800 shadow-md static border border-gray-200"
                  key={item.guid}
                >
                  <a href={item.link} target={"_blank"}>
                    <div className="mb-3">
                      <h2 className="text-lg font-semibold text-gray-800 capitalize">
                        {item.title}
                      </h2>
                      <span className="font-thin text-xs">
                        {formatDate(item.pubDate)}
                      </span>
                    </div>
                    <p className="text-sm text-justify line-clamp-3 text-gray-600">
                      {item.description}
                    </p>
                    <div className="mt-2 text-right">
                      <span className="font-thin text-sm text-rose-600 hover:text-rose-800">
                        Read More →
                      </span>
                    </div>
                  </a>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
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
