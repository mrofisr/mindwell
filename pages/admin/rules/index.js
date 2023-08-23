import { useEffect, useState } from "react";
import { LayoutAdmin } from "@/components/Layout";
import SideBar from "@/components/Sidebar";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import firebase_app from "@/src/firebase/config";

export default function BasisPengetahuan() {
  const [penyakit, setPenyakit] = useState({});
  const [rules, setRules] = useState({});
  const db = getFirestore(firebase_app);
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
  const sortedKeysRules = Object.keys(rules || {}).sort();
  return (
    <>
      <LayoutAdmin>
        <SideBar />
        <div className="container mx-auto h-full">
          <div className="p-4 sm:ml-52">
            <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 py-3">
                        Code
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Rule
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Penyakit
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedKeysRules.map((key) => {
                      {
                        const item = rules[key];
                        const formattedString =
                          "Jika " +
                          item.id_gejala
                            .map((item) => item + " DAN")
                            .join("\n") +
                          ".";
                        const cleanedString = formattedString.slice(0, -4); 
                        return (
                          <tr>
                            <td className="px-4 py-3 font-bold">{key}</td>
                            <td className="px-4 py-3">{cleanedString}.</td>
                            <td className="px-4 py-3">
                              {penyakit[item.id_penyakit].nama}
                            </td>
                            <td className="px-4 py-3">
                              <a
                                href={"/admin/rules/edit/" + key}
                                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
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
