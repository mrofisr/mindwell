import { useRouter } from "next/router";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineQuiz } from "react-icons/md";
import { MdOutlineArticle } from "react-icons/md";
import { HiOutlineHome } from "react-icons/hi";

export default function Navbar() {
  const router = useRouter();
  // Check if the current page is the home page
  const isHomePage = router.pathname === "/";
  // Check if the current page is the articles page
  const isArticlesPage = router.pathname === "/articles";
  // Check if the current page is the quiz page
  const isQuizPage = router.pathname === "/quiz";
  // Check if the current page is the profile page
  const isProfilePage = router.pathname === "/profile";
  return (
    <>
      <div className="rounded-t-xl bg-white w-full max-w-md h-[80px] px-6 py-4 flex justify-between text-gray-font fixed bottom-0 z-40 border-t border-gray-300">
        <a href="/">
          <span className="px-2 py-1 cursor-pointer hover:text-gray-700 text-sm flex flex-col items-center text-center text-primary">
              <HiOutlineHome className={
                isHomePage
                  ? "w-6 h-6 text-rose-500"
                  : "w-6 h-6 text-gray-500"
              }/>
            <span
              className={isHomePage ? "mx-1 text-rose-500" : "mx-1 text-gray-500"}
            >
              Home
            </span>
          </span>
        </a>
        <a href="/articles">
          <span className="px-2 py-1 cursor-pointer hover:text-gray-700 text-sm flex flex-col items-center text-center">
            <MdOutlineArticle
              className={
                isArticlesPage
                  ? "w-6 h-6 text-rose-500"
                  : "w-6 h-6 text-gray-500"
              }
            />
            <span
              className={isArticlesPage ? "mx-1 text-rose-500" : "mx-1 text-gray-500"}
            >
              Articles
            </span>
          </span>
        </a>
        <a href="/quiz">
          <span className="px-2 py-1 cursor-pointer  hover:text-gray-700 text-sm flex flex-col items-center text-center">
            <MdOutlineQuiz
              className={
                isQuizPage
                  ? "w-6 h-6 text-rose-500"
                  : "w-6 h-6 text-gray-500"
              }
            />
            <span
              className={isQuizPage ? "mx-1 text-rose-500" : "mx-1 text-gray-500"}
            >
              Quiz
            </span>
          </span>
        </a>
        <a href="/profile">
          <span className="px-2 py-1 cursor-pointer  hover:text-gray-700 text-sm flex flex-col items-center text-center">
            <IoPersonOutline
              className={
                isProfilePage
                  ? "w-6 h-6 text-rose-500"
                  : "w-6 h-6 text-gray-500"
              }
            />
            <span
              className={
                isProfilePage ? "mx-1 text-rose-500" : "mx-1 text-gray-500"
              }
            >
              Profile
            </span>
          </span>
        </a>
      </div>
    </>
  );
}
