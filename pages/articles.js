import Navbar from "@/components/Navbar";
import Parser from "rss-parser";
import { useState } from "react";
import TitlePage from "@/components/TitlePage";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Image from "next/image";

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

export default function Articles({ feedData }) {
  const [visibleItems, setVisibleItems] = useState(feedData.slice(0, 10));

  const showMoreItems = () => {
    const nextItems = feedData.slice(
      visibleItems.length,
      visibleItems.length + 5
    );
    setVisibleItems([...visibleItems, ...nextItems]);
  };

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
        <TitlePage title={"Articles"} />
        {visibleItems.map((item) => (
          <div
            className="w-full mx-auto rounded-lg bg-white px-5 py-5 my-5 text-gray-800 border border-gray-100 rounded-3xl"
            key={item.guid}
          >
            <a href={item.link} target={"_blank"}>
              <div className="mb-3">
                <h2 className="text-lg font-semibold text-gray-800 capitalize">{item.title}</h2>
                <span className="font-thin text-xs">
                  {formatDate(item.pubDate)}
                </span>
              </div>
              <p className="text-sm text-justify line-clamp-3 text-gray-600">
                {item.description}
              </p>
              <div className="mt-2 text-right">
                <span className="font-thin text-sm text-sky-500">
                  Read More →
                </span>
              </div>
            </a>
          </div>
        ))}
        {visibleItems.length < feedData.length && (
          <div className="mb-20 text-primary ">
            <button onClick={showMoreItems} className="w-full py-2 border rounded-full border-gray-200 hover:bg-blue-50 hover:border-blue-400 focus:outline-none">
              <span className="text-sky-600">Show More</span>
            </button>
          </div>
        )}
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
