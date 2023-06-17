import { LayoutAdmin } from "@/components/Layout";
import SideBar from "@/components/Sidebar";
import firebase_app from "@/src/firebase/config";
import { getCookie } from "cookies-next";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

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

export default function AdminPage() {
  const db = getFirestore(firebase_app);
  const [penyakit, setPenyakit] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, "sistem-pakar", "mental-health");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPenyakit(docSnap.data().penyakit);
      } else {
        console.log("Document does not exist");
      }
    };
    getData();
  }, []);
  function saveDataPenyakit() {
    const docRef = doc(db, "sistem-pakar", "mental-health");
    setDoc(docRef, { penyakit: penyakit }, { merge: true });
    Swal.fire({
      title: "Success",
      text: "Data Berhasil Disimpan",
      icon: "success",
      timer: 1000,
      heightAuto: true,
      width: 350,
      showCancelButton: false,
      showConfirmButton: false,
      showCloseButton: false,
    }).then(() => router.push("/admin"));
  }
  useEffect(() => {}, [penyakit]);
  return (
    <>
      <LayoutAdmin>
        <SideBar />
        <div className="container mx-auto h-full">
          <div className="p-4 sm:ml-52">
            <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <div className="table-wrapper">
                  <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th scope="col" className="px-4 py-3">
                          No
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Code
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Name
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {penyakit.map((data, index) => (
                        <tr>
                          <td
                            scope="row"
                            className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap"
                          >
                            {index + 1}
                          </td>
                          <td
                            scope="row"
                            className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap"
                          >
                            <input
                              type="text"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2"
                              value={data.code}
                            ></input>
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="text"
                              className="bg-gray-50 capitalize border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2"
                              value={data.name}
                              onChange={(e) => {
                                const temp = [...penyakit];
                                temp[index].name = e.target.value;
                                setPenyakit(temp);
                              }}
                            ></input>
                          </td>
                          <td className="px-4 py-3">
                            <textarea
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2"
                              type="text"
                              value={data.description}
                              onChange={(e) => {
                                const temp = [...penyakit];
                                temp[index].description = e.target.value;
                                setPenyakit(temp);
                              }}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button
                    className="my-10 mx-auto block w-[904px] py-3.5 rounded-lg bg-rose-400 border-b-4 border-rose-500 text-white"
                    onClick={(e) => {
                      saveDataPenyakit();
                    }}
                  >
                    Save Data
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutAdmin>
    </>
  );
}
