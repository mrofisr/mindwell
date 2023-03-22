import Navbar from "@/components/Navbar";
import Parser from "rss-parser";
import { useState } from "react";
import TitlePage from "@/components/TitlePage";

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
export default function Articles({ feedData }) {
  const [showMore, setShowMore] = useState(false);
  const visibleItems = showMore ? feedData : feedData.slice(0, 10);
  return (
    <>
      <div>
        <TitlePage title={"Articles"}/>
        {visibleItems.map((item) => (
          <div
            className="mx-auto w-11/12 bg-white mb-6 rounded shadow-content dark:bg-dark-grey border-t-2 border-l-2 border-r-4 border-b-4 transform hover:translate-y-2 transition duration-300"
            key={item.guid}
          >
            <a href={item.link} className="flex item-center px-5 py-8 cursor-pointer" target={"_blank"}>
              <div className="w-5/6 ite">
                <h2 className="text-lg font-bold mb-3 capitalize">
                  {item.title}
                </h2>
                <p className="text-sm text-justify truncate">{item.description}</p>
              </div>
            </a>
          </div>
        ))}
      </div>
      {!showMore && (
        <button onClick={() => setShowMore(true)}>Show More</button>
      )}
      <div className="mb-24"/>
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
