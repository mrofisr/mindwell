import { LayoutAdmin } from "@/components/Layout";
import SideBar from "@/components/Sidebar";
import firebase_app from "@/src/firebase/config";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function AddBasisPengetahuan() {
  const [gejala, setGejala] = useState({});
  const [penyakit, setPenyakit] = useState({}); // tambah ini
  const [rules, setRules] = useState({}); // tambah ini
  const db = getFirestore(firebase_app);
  const [selectedPenyakit, setSelectedPenyakit] = useState(""); // Initialize with a default value
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]); // Initialize as an empty array
  const router = useRouter();
  const handleCheckboxChange = (e) => {
    const checkboxValue = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      // If checked, add the value to the selectedCheckboxes array
      setSelectedCheckboxes((prevState) => [...prevState, checkboxValue]);
    } else {
      // If unchecked, remove the value from the selectedCheckboxes array
      setSelectedCheckboxes((prevState) =>
        prevState.filter((value) => value !== checkboxValue)
      );
    }
  };
  const handleSelectChange = (e) => {
    setSelectedPenyakit(e.target.value);
  };
  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, "sistem-pakar", "mental-health");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setGejala(docSnap.data().gejala2);
        setPenyakit(docSnap.data().penyakit2); // tambah ini
        setRules(docSnap.data().rules); // tambah ini
      } else {
        console.log("Document does not exist");
      }
    };
    getData();
  }, []);

  function incrementKey(key) {
    // Extract the numeric part of the key
    const numericPart = parseInt(key.slice(1), 10);

    if (!isNaN(numericPart)) {
      // Increment the numeric part and format it back into the desired format
      const newNumericPart = numericPart + 1;
      const newKey = `R${newNumericPart.toString().padStart(2, "0")}`;
      return newKey;
    } else {
      // If the numeric part couldn't be extracted, return the original key
      return key;
    }
  }

  function saveDataRules() {
    const docRef = doc(db, "sistem-pakar", "mental-health");
    const lastKeyRules = Object.keys(rules).sort().pop();
    const newKey = incrementKey(lastKeyRules);
    const dataSave = {
      [newKey]: {
        id_gejala: selectedCheckboxes,
        id_penyakit: selectedPenyakit,
      },
    };
    setDoc(docRef, { rules: dataSave }, { merge: true });
    Swal.fire({
      title: "Success",
      text: "Rules Berhasil Disimpan",
      icon: "success",
      timer: 1000,
      heightAuto: true,
      width: 350,
      showCancelButton: false,
      showConfirmButton: false,
      showCloseButton: false,
    }).then(() => router.push("/admin/rules"));
  }
  return (
    <>
      <LayoutAdmin>
        <SideBar />
        <div className="container mx-auto h-full">
          <div className="p-4 sm:ml-52">
            <div className="my-4">
              <label
                for="countries"
                class="block mb-2 text-sm text-gray-900 font-bold"
              >
                Nama Penyakit Mental
              </label>
              <select
                id="countries"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                onChange={handleSelectChange}
                value={selectedPenyakit}
              >
                <option selected disabled>
                  Pilih Penyakit Mental
                </option>
                {Object.keys(penyakit).sort().map((key) => {
                  const item = penyakit[key];
                  return <option value={key}>{item.nama}</option>;
                })}
              </select>
            </div>
            <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 py-3">
                        No
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Checklist
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Nama Gejala
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(gejala)
                      .sort()
                      .map((key, no) => {
                        const item = gejala[key];
                        return (
                          <tr key={key}>
                            <td className="px-4 py-3">{no + 1}</td>
                            <td className="px-4 py-3">
                              <input
                                type="checkbox"
                                name="gejala"
                                onChange={handleCheckboxChange}
                                checked={selectedCheckboxes.includes(key)}
                                value={key}
                                className="form-checkbox h-5 w-5 text-gray-600"
                              />
                            </td>
                            <td className="px-4 py-3">{item.nama_gejala}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                <button
                  className="my-10 mx-auto block w-[904px] py-3.5 rounded-lg bg-rose-400 border-b-4 border-rose-500 text-white"
                  onClick={(e) => {
                    saveDataRules();
                  }}
                >
                  Save Data
                </button>
              </div>
            </div>
          </div>
        </div>
      </LayoutAdmin>
    </>
  );
}
