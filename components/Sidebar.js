import { BsFillPersonFill } from "react-icons/bs";
import { GoSignOut } from "react-icons/go";
import { TbChecklist } from "react-icons/tb";
import { AiFillAlert } from "react-icons/ai";
import { GiAerialSignal } from "react-icons/gi";
import { deleteCookie } from "cookies-next";
import { AiFillHome } from "react-icons/ai";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const SideBar = () => {
  const router = useRouter();
  return (
    <>
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50">
          <ul className="space-y-2 font-medium space-y-6">
            <li>
              <a
                href="/admin"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 "
              >
                <AiFillHome className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900" />
                <span className="ml-3">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="/admin/user"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 "
              >
                <BsFillPersonFill className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900" />
                <span className="flex-1 ml-3 whitespace-nowrap">User</span>
              </a>
            </li>
            <li>
              <a
                href="/admin/gejala"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 "
              >
                <GiAerialSignal className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900" />
                <span className="flex-1 ml-3 whitespace-nowrap">Gejala</span>
              </a>
            </li>
            <li>
              <a
                href="/admin/penyakit"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 "
              >
                <AiFillAlert className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900" />
                <span className="flex-1 ml-3 whitespace-nowrap">Penyakit</span>
              </a>
            </li>
            <li>
              <a
                href="/admin/hasil"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 "
              >
                <TbChecklist className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900" />
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
                className="flex items-center p-2 text-red-500 rounded-lg hover:bg-gray-100 "
              >
                <GoSignOut className="flex-shrink-0 w-6 h-6 text-red-500 transition duration-75 group-hover:text-gray-900" />
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
