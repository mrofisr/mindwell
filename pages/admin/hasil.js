import { LayoutAdmin } from "@/components/Layout";
import SideBar from "@/components/Sidebar";
import firebase_app from "@/src/firebase/config";
import { getCookie } from "cookies-next";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Timestamp, doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";

export async function getServerSideProps({ req, res }) {
  const auth = getCookie("admin", { req, res });
  if (!auth) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

const formatDate = (dateStr) => {
  const dateObj = new Date(dateStr);
  return format(dateObj, "EEEE, dd MMMM yyyy", { locale: id });
};

export default function AdminPage() {
  const db = getFirestore(firebase_app);
  const [result, setResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredData = result.filter((item) => {
    return item.displayName?.toLowerCase().includes(searchTerm.toLowerCase());
  });
  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, "sistem-pakar", "mental-health");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setResult(docSnap.data().result);
      } else {
      }
    };
    getData();
  }, []);
  return (
    <>
      <LayoutAdmin>
        <SideBar />
        <div className="container mx-auto px-4 py-8">
          <div className="p-4 sm:ml-64">
            <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
              <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                  <div className="w-full md:w-1/2">
                    <form className="flex items-center">
                      <label for="simple-search" className="sr-only">
                        Search
                      </label>
                      <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <svg
                            ariaHidden="true"
                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <input
                          type="text"
                          id="simple-search"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Search"
                          required=""
                          onChange={handleSearchChange}
                        />
                      </div>
                    </form>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-4 py-3">
                          Nama
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Fakultas
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Jurusan
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Tahun Angkatan
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Penyakit
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Tanggal Tes
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((user) => (
                        <tr className="border-b dark:border-gray-700">
                          <td
                            scope="row"
                            className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {user.displayName}
                          </td>
                          <td className="px-4 py-3">{user.faculty}</td>
                          <td className="px-4 py-3">{user.majority}</td>
                          <td className="px-4 py-3">{user.year}</td>
                          <td className="px-4 py-3">{user.penyakit}</td>
                          <td className="px-4 py-3">
                            {formatDate(
                              new Timestamp(
                                user?.createdAt.seconds,
                                user?.createdAt.nanoseconds
                              ).toDate()
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutAdmin>
    </>
  );
}
