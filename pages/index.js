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
import { useRouter } from "next/router";
import { Transition } from "@headlessui/react";
import { Layout } from "@/components/Layout";
import { deleteCookie, getCookie } from "cookies-next";

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

export async function getServerSideProps({ req, res }) {
  const searchQuery = ""; // Add your desired search query here
  const feedData = await getFeedData(searchQuery);
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
      feedData,
    },
  };
}

const formatDate = (dateStr) => {
  const dateObj = new Date(dateStr);
  return format(dateObj, "EEEE, dd MMMM yyyy", { locale: id });
};

export default function Index({ feedData }) {
  const router = useRouter();
  const date = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" })
  );
  const auth = getAuth(firebase_app);
  const [user, setUser] = useState();
  const [visibleItems, setVisibleItems] = useState(feedData.slice(0, 10));
  const timeOfDay = getTimeOfDay(date);
  const [quote, setQuote] = useState(null);

  const fetchQuote = async () => {
    try {
      const res = await fetch(
        "https://api.quotable.io/random?tags=happiness|life|love|self|wisdom&minLength=100&maxLength=130"
      );
      const data = await res.json();
      setQuote(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user || !getCookie("auth")) {
        deleteCookie("auth");
        auth.signOut();
      } else {
        const { displayName } = user || {};
        setUser({ displayName });
      }
    });
    fetchQuote();
  }, [auth]);

  return (
    <>
      <Layout>
        <div className="mx-4 my-5">
          <Transition
            show={true}
            enter="transition-all ease-in-out duration-500 delay-[200ms]"
            enterFrom="opacity-0 translate-y-6"
            enterTo="opacity-100 translate-y-0"
            leave="transition-all ease-in-out duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Image
              src="/mindwell.png"
              className="object-center"
              width={100}
              height={33}
              alt="Logo"
              onClick={() => router.push("/")}
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
                    <svg
                      aria-hidden="true"
                      className="w-4 h-4 text-gray-600"
                      viewBox="0 0 24 27"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                        fill="currentColor"
                      />
                    </svg>
                    <p className="text-md text-gray-800 italic font-semibold">
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
                slidesPerView={1.15}
                spaceBetween={20}
                freeMode={true}
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
                    <div className="w-full h-[206px] rounded-lg bg-white px-5 py-5 my-5 text-gray-800 shadow-md border border-gray-200">
                      <a href={item.link} target={"_blank"}>
                        <div className="mb-3">
                          <h2 className="text-lg font-semibold text-gray-800 capitalize">
                            {item.title}
                          </h2>
                          <span className="text-xs">
                            {formatDate(item.pubDate)}
                          </span>
                        </div>
                        <p className="text-sm text-justify line-clamp-2 text-gray-600">
                          {item.description}
                        </p>
                        <div className="mt-2 text-right">
                          <span className="text-sm text-rose-800">
                            Read More →
                          </span>
                        </div>
                      </a>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </Transition>
        </div>
        <Navbar />
      </Layout>
    </>
  );
}