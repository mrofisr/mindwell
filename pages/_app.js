import "@/styles/globals.css";
import "@/styles/custom-swiper.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>MindWell | Better Mind, Better Life</title>
      </Head>
      <div className="flex flex-col">
        <div className="h-full bg-gray-100">
          <div className="block box-border bg-white max-w-md w-full mx-auto h-full">
            <div className="flex flex-col min-h-screen max-h-full">
              <Component {...pageProps} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
