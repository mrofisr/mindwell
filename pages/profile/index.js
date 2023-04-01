import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Profile() {
  
  return (
    <>
      <div className="px-6">
        <div className="flex flex-wrap justify-center mt-[95px]">
          <div className="w-full flex justify-center">
            <div className="relative">
              <img
                src="https://github.com/creativetimofficial/soft-ui-dashboard-tailwind/blob/main/build/assets/img/team-2.jpg?raw=true"
                className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
              />
            </div>
          </div>
          <div className="w-full text-center mt-20 pt-8">
            <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1">
              Mike Thompson
            </h3>
            <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
              <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>
              Paris, France
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-wrap justify-center">
              <Link
                href="/profile/1"
                className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-full"
              >
                Update Profile
              </Link>
            </div>
            <div className="mt-10">
              <Link
                href="/quiz/history"
                className="px-36 py-3.5 rounded-lg bg-blue-500 hover:bg-blue-700 text-white"
              >
                Quiz Results
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap justify-center">
              <Link
                href="/quiz/history"
                className="text-white rounded-full border-2 px-1 py-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M5.5 15a3.51 3.51 0 0 0 2.36-.93l6.26 3.58a3.06 3.06 0 0 0-.12.85 3.53 3.53 0 1 0 1.14-2.57l-6.26-3.58a2.74 2.74 0 0 0 .12-.76l6.15-3.52A3.49 3.49 0 1 0 14 5.5a3.35 3.35 0 0 0 .12.85L8.43 9.6A3.5 3.5 0 1 0 5.5 15zm12 2a1.5 1.5 0 1 1-1.5 1.5 1.5 1.5 0 0 1 1.5-1.5zm0-13A1.5 1.5 0 1 1 16 5.5 1.5 1.5 0 0 1 17.5 4zm-12 6A1.5 1.5 0 1 1 4 11.5 1.5 1.5 0 0 1 5.5 10z"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Navbar />
    </>
  );
}
