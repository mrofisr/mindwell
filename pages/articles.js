import Navbar from "@/components/Navbar";
import Parser from "rss-parser";
import { useEffect, useState } from "react";
import TitlePage from "@/components/TitlePage";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Image from "next/image";
import { useRouter } from "next/router";
import LoadingPage from "@/components/Loading";
import { Transition } from "@headlessui/react";
import { Layout } from "@/components/Layout";

async function getFeedData(searchQuery = "") {
  const parser = new Parser();
  const feed = await parser.parseURL("https://hilman.space/blog/index.xml");

  const filteredItems = feed.items.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return filteredItems.map((item) => ({
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

export default function Articles({ feedData }) {
  const router = useRouter();
  const [visibleItems, setVisibleItems] = useState(feedData.slice(0, 10));
  const [searchQuery, setSearchQuery] = useState("");
  const [showMoreVisible, setShowMoreVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const showMoreItems = () => {
    const nextItems = feedData.slice(
      visibleItems.length,
      visibleItems.length + 5
    );
    setVisibleItems([...visibleItems, ...nextItems]);
  };

  useEffect(() => {
    setVisibleItems(
      feedData
        .filter((item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 10)
    );
    setIsLoading(false);
  }, [feedData, searchQuery]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  return (
    <>
      <Layout>
        <div className="mx-4 my-5">
          {!isLoading ? (
            <div>
              <Image
                src="/mindwell.png"
                className="object-center"
                width={100}
                height={33}
                alt="Logo"
                onClick={() => router.push("/")}
              />
              <TitlePage title={"Articles"} />
              <div className="relative mx-auto mb-5 border border-rose-500 rounded-3xl">
                <input
                  type="text"
                  placeholder="Search by title"
                  className="w-full py-2 pl-10 pr-3 rounded-full border-rose-500 focus:border-primary focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => {
                    handleSearchInputChange(e);
                    searchQuery === ""
                      ? setShowMoreVisible(false)
                      : setShowMoreVisible(true);
                  }}
                />
                <span className="absolute left-3 top-3">
                  <svg
                    className="w-5 h-5 text-rose-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                </span>
              </div>
              <Transition
                show={true}
                enter="transition-all ease-in-out duration-500 delay-[200ms]"
                enterFrom="opacity-0 translate-y-6"
                enterTo="opacity-100 translate-y-0"
                leave="transition-all ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                {visibleItems.map((item) => (
                  <div
                    className="w-full mx-auto rounded-lg bg-white px-5 py-5 my-5 text-gray-800 shadow-md border border-gray-200"
                    key={item.guid}
                  >
                    <a href={item.link} target={"_blank"}>
                      <div className="mb-3">
                        <h2 className="text-lg font-semibold text-gray-800 capitalize">
                          {item.title}
                        </h2>
                        <span className="text-xs">
                          {formatDate(item.pubDate)}
                        </span>
                      </div>
                      <p className="text-sm text-justify line-clamp-3 text-gray-600">
                        {item.description}
                      </p>
                      <div className="mt-2 text-right">
                        <span className="text-sm text-rose-800">
                          Read More →
                        </span>
                      </div>
                    </a>
                  </div>
                ))}
              </Transition>
              {!searchQuery &&
                visibleItems.length < feedData.length &&
                showMoreVisible && (
                  <div className="mb-20 text-primary ">
                    <button
                      onClick={showMoreItems}
                      className="w-full py-2 border rounded-full border-gray-200 hover:bg-rose-50 hover:border-rose-400 focus:outline-none"
                    >
                      <span className="text-rose-600">Show More</span>
                    </button>
                  </div>
                )}
            </div>
          ) : (
            <LoadingPage />
          )}
        </div>
        <Navbar />
      </Layout>
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
