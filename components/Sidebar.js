import { BsFillPersonFill } from "react-icons/bs";
import { GoSignOut } from "react-icons/go";
import { TbChecklist } from "react-icons/tb";
import { AiFillAlert } from "react-icons/ai";
import { GiAerialSignal } from "react-icons/gi";
import { deleteCookie } from "cookies-next";
import { AiFillHome } from "react-icons/ai";
import Swal from "sweetalert2";

const SideBar = () => {
  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="/admin"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <AiFillHome className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ml-3">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="/admin/user"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <BsFillPersonFill className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ml-3 whitespace-nowrap">User</span>
              </a>
            </li>
            <li>
              <a
                href="/admin/gejala"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <GiAerialSignal className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ml-3 whitespace-nowrap">Gejala</span>
              </a>
            </li>
            <li>
              <a
                href="/admin/penyakit"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <AiFillAlert className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ml-3 whitespace-nowrap">Penyakit</span>
              </a>
            </li>
            <li>
              <a
                href="/admin/hasil"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <TbChecklist className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ml-3 whitespace-nowrap">Hasil</span>
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  deleteCookie("admin");
                  Swal.fire({
                    title: "Logout",
                    text: "Logout berhasil",
                    icon: "success",
                    timer: 1000,
                    heightAuto: true,
                    width: 350,
                    showCancelButton: false,
                    showConfirmButton: false,
                    showCloseButton: false,
                  }).then(() => router.push("/admin/login"));
                }}
                className="flex items-center p-2 text-red-500 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <GoSignOut className="flex-shrink-0 w-6 h-6 text-red-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ml-3 whitespace-nowrap">Sign Out</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};
export default SideBar;
