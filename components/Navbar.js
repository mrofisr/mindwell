import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
  // Check if the current page is the home page
  const isHomePage = router.pathname === "/";
  // Check if the current page is the quiz page
  const isQuizPage = router.pathname === "/quiz";
  // Check if the current page is the profile page
  const isProfilePage = router.pathname === "/profile";
  return (
    <>
      <div className="rounded-t-xl bg-white w-full max-w-md h-[80px] px-6 py-4 flex justify-between text-gray-font fixed bottom-0 z-40 border-t border-gray-99">
        <Link href="/">
          <span className="px-2 py-1 cursor-pointer  hover:text-gray-700 text-sm flex flex-col items-center text-center text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={
                isHomePage
                  ? "w-6 h-6 fill-current text-black"
                  : "w-6 h-6 fill-current text-gray-500"
              }
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M12.71 2.29a1 1 0 0 0-1.42 0l-9 9a1 1 0 0 0 0 1.42A1 1 0 0 0 3 13h1v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7h1a1 1 0 0 0 1-1 1 1 0 0 0-.29-.71zM6 20v-9.59l6-6 6 6V20z"></path>
            </svg>

            <span
              className={isHomePage ? "mx-1 text-black" : "mx-1 text-gray-500"}
            >
              Home
            </span>
          </span>
        </Link>
        <Link href="/quiz">
          <span className="px-2 py-1 cursor-pointer  hover:text-gray-700 text-sm flex flex-col items-center text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="48"
              viewBox="0 96 960 960"
              width="48"
              className={
                isQuizPage
                  ? "w-6 h-6 fill-current text-black"
                  : "w-6 h-6 fill-current text-gray-500"
              }
            >
              <path d="M543 716q16.595 0 28.798-12.202Q584 691.595 584 675t-12.202-28.798Q559.595 634 543 634t-28.798 12.202Q502 658.405 502 675t12.202 28.798Q526.405 716 543 716Zm-25-126h47q2-29 8.5-43t32.5-39q27-26 37.5-45.395Q654 443.21 654 417q0-45.882-31.5-74.941Q591 313 540 313q-38 0-68 20.5T428 391l45 19q11-25 27.5-38t39.5-13q29.778 0 48.389 17Q607 393 607 419q0 20-9 35t-32 32q-32 29-40 46.5t-8 57.5ZM260 856q-24 0-42-18t-18-42V236q0-24 18-42t42-18h560q24 0 42 18t18 42v560q0 24-18 42t-42 18H260Zm0-60h560V236H260v560ZM140 976q-24 0-42-18t-18-42V296h60v620h620v60H140Zm120-740v560-560Z" />
            </svg>
            <span
              className={isQuizPage ? "mx-1 text-black" : "mx-1 text-gray-500"}
            >
              Quiz
            </span>
          </span>
        </Link>
        <Link href="/profile">
          <span className="px-2 py-1 cursor-pointer  hover:text-gray-700 text-sm flex flex-col items-center text-center">
            <svg
              className={
                isProfilePage
                  ? "w-6 h-6 fill-current text-black"
                  : "w-6 h-6 fill-current text-gray-500"
              }
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"></path>
            </svg>

            <span
              className={
                isProfilePage ? "mx-1 text-black" : "mx-1 text-gray-500"
              }
            >
              Profile
            </span>
          </span>
        </Link>
      </div>
    </>
  );
}
