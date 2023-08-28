import { useEffect, useState } from "react";
import { LayoutAdmin } from "@/components/Layout";
import SideBar from "@/components/Sidebar";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import firebase_app from "@/src/firebase/config";
import { useRouter } from "next/router";

export default function BasisPengetahuan() {
  const [penyakit, setPenyakit] = useState({});
  const [rules, setRules] = useState({});
  const db = getFirestore(firebase_app);
  const router = useRouter();
  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, "sistem-pakar", "mental-health");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPenyakit(docSnap.data().penyakit2);
        setRules(docSnap.data().rules);
      } else {
        console.log("Document does not exist");
      }
    };
    getData();
  }, []);
  return (
    <>
      <LayoutAdmin>
        <SideBar />
        <div className="container mx-auto h-full">
          <div className="p-4 sm:ml-52">
            <button
              class="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 border border-rose-700 rounded my-4"
              onClick={() => router.push("/admin/rules/add")}
            >
              Add Data
            </button>
            <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 py-3">
                        Code
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Rules
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Nama Penyakit
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(rules || {})
                      .sort()
                      .map((key) => {
                        {
                          const item = rules[key];
                          const formattedString =
                            "Jika " +
                            item.id_gejala
                              .map((item) => item + " DAN")
                              .join("\n") +
                            ".";
                          const cleanedString = formattedString.slice(0, -5);
                          return (
                            <tr>
                              <td className="px-4 py-3 font-bold">{key}</td>
                              <td className="px-4 py-3">{cleanedString}.</td>
                              <td className="px-4 py-3">
                                {penyakit[item.id_penyakit]
                                  ? penyakit[item.id_penyakit].nama
                                  : "No Name"}
                              </td>
                              <td className="px-4 py-3">
                                <a
                                  href={"/admin/rules/edit/" + key}
                                  class="font-medium text-rose-600 dark:text-rose-500 hover:underline"
                                >
                                  Edit
                                </a>
                              </td>
                            </tr>
                          );
                        }
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </LayoutAdmin>
    </>
  );
}
