import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper";
import Image from "next/image";

export default function Login() {
  SwiperCore.use([Pagination]);
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
      <Swiper pagination={true} className="mySwiper ">
        <SwiperSlide>
          <div className="w-full h-full pt-16">
            <img
              src="ilustrations/login/2.svg"
              className="mx-auto h-52 w-52"
              alt="Illustration"
            />
            <div className="text-center">
              <h1 id="haha" className="mt-4 text-xl font-bold">
                Mental Health Test
              </h1>
              <p className="mb-28 mt-1  text-[14px] font-[50]">
                Assess emotional and psychological well-being.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-full pt-16">
            <img
              src="ilustrations/login/3.svg"
              className="mx-auto h-52 w-52"
              alt="Illustration"
            />
            <div className="text-center">
              <h1 id="haha" className="mt-4 text-xl font-bold">
                Read Articles about Mental Health
              </h1>
              <p className="mb-28 mt-1  text-[14px] font-[50]">
                Learn about mental health through articles.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-full pt-16">
            <img
              src="ilustrations/login/4.svg"
              className="mx-auto h-52 w-52"
              alt="Illustration"
            />
            <div className="text-center">
              <h1 id="haha" className="mt-4 text-xl font-bold">
                Track Your Mental Health
              </h1>
              <p className="mb-28 mt-1 text-[14px] font-[50]">
                Monitor mental health progress regularly.
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      </div>
    </>
  );
}
