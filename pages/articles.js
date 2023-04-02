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
            className="mx-auto w-11/12 bg-white mb-6 rounded shadow-content dark:bg-dark-grey border-t-2 border-l-2 border-r-4 border-b-4 transform hover:translate-y-2 transition duration-300"
            key={item.guid}
          >
            <a
              href={item.link}
              className="flex item-center px-5 py-8 cursor-pointer"
              target={"_blank"}
            >
              <div className="w-5/6 ite">
                <div className="mb-3">
                  <h2 className="text-lg font-bold capitalize">{item.title}</h2>
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
          </div>
        ))}
      </div>
      {visibleItems.length < feedData.length && (
        <button onClick={showMoreItems}>Show More</button>
      )}
      <div className="mb-24" />
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
