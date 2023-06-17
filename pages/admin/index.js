import { LayoutAdmin } from "@/components/Layout";
import SideBar from "@/components/Sidebar";
import firebase_app from "@/src/firebase/config";
import { Chart } from "chart.js/auto";
import { getCookie } from "cookies-next";
import {RxActivityLog} from "react-icons/rx";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";

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
  const [result, setResult] = useState([]);
  const [users, setUsers] = useState([]);
  const barChartRef = useRef(null);
  let chartInstance = null;

  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, "sistem-pakar", "mental-health");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setResult(docSnap.data().result);
      } else {
        console.log("Document does not exist");
      }
    };
    const getUser = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      setUsers(querySnapshot.docs.map((doc) => doc.data()) || []);
    };
    getData();
    getUser();
  }, []);
  useEffect(() => {
    if (barChartRef.current) {
      const months = {};
      // Count the number of users in each month
      result.forEach((item) => {
        const createdAt = item.createdAt;
        const date = new Date(createdAt.seconds * 1000);
        const month = date.toLocaleString("default", { month: "long" });
        months[month] = months[month] ? months[month] + 1 : 1;
      });

      const monthLabels = Object.keys(months);
      const userCounts = Object.values(months);
      if (chartInstance) {
        chartInstance.destroy();
      }

      chartInstance = new Chart(barChartRef.current, {
        type: "bar",
        data: {
          labels: monthLabels,
          datasets: [
            {
              label: "Jumlah Pengguna",
              data: userCounts,
              backgroundColor: "rgba(75, 192, 192, 0.5)",
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              precision: 0,
            },
          },
          maintainAspectRatio: false,
          responsive: true,
        },
      });
    }
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [result]);
  return (
    <>
      <LayoutAdmin>
        <SideBar />
        <div className="container mx-auto h-full">
          <div className="p-4 sm:ml-52">
              <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <div id="24h" className="mx-4">
                    <h1 className="font-bold py-4 uppercase">The data</h1>
                    <div id="stats" className="grid grid-cols-2 gap-6">
                      <div className="bg-black/60 to-white/5 p-6 rounded-lg">
                        <div className="flex flex-row space-x-4 items-center">
                          <div id="stats-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              rokeWidth="1.5"
                              stroke="currentColor"
                              className="w-10 h-10 text-white"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                              ></path>
                            </svg>
                          </div>
                          <div>
                            <p className="text-indigo-300 text-sm font-medium uppercase leading-4">
                              Users
                            </p>
                            <p className="text-white font-bold text-2xl inline-flex items-center space-x-2">
                              <span>{users.length}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-black/60 p-6 rounded-lg">
                        <div className="flex flex-row space-x-4 items-center">
                          <div>
                            <RxActivityLog
                            className="w-10 h-10 text-white"
                            />
                          </div>
                          <div>
                            <p className="text-teal-300 text-sm font-medium uppercase leading-4">
                              Activity Test
                            </p>
                            <p className="text-white font-bold text-2xl inline-flex items-center space-x-2">
                              <span>{result.length}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h1 className="font-bold py-4 uppercase">
                      Analytic User Test
                    </h1>
                    <div id="stats" className="grid grid-cols-1 gap-6">
                      <canvas ref={barChartRef} className="w-full"></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </LayoutAdmin>
    </>
  );
}
