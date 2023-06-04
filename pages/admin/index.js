import { LayoutAdmin } from "@/components/Layout";
import SideBar from "@/components/Sidebar";
import firebase_app from "@/src/firebase/config";
import { Chart } from "chart.js/auto";
import { getCookie } from "cookies-next";
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
  const faculty = [...new Set(users.map((user) => user.faculty))];
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
              label: "Number of Users",
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
        },
      });
    }
    getData();
    getUser();
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);
  return (
    <>
      <LayoutAdmin>
        <SideBar />
        <div className="container mx-auto h-full">
          <div className="p-4 sm:ml-36">
            <div className="px-12">
              <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <div id="24h" className="mx-4">
                    <h1 class="font-bold py-4 uppercase">The data</h1>
                    <div id="stats" class="grid grid-cols-2 gap-6">
                      <div class="bg-black/60 to-white/5 p-6 rounded-lg">
                        <div class="flex flex-row space-x-4 items-center">
                          <div id="stats-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-10 h-10 text-white"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                              ></path>
                            </svg>
                          </div>
                          <div>
                            <p class="text-indigo-300 text-sm font-medium uppercase leading-4">
                              Users
                            </p>
                            <p class="text-white font-bold text-2xl inline-flex items-center space-x-2">
                              <span>{users.length}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div class="bg-black/60 p-6 rounded-lg">
                        <div class="flex flex-row space-x-4 items-center">
                          <div id="stats-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-10 h-10 text-white"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              ></path>
                            </svg>
                          </div>
                          <div>
                            <p class="text-teal-300 text-sm font-medium uppercase leading-4">
                              Activity Test
                            </p>
                            <p class="text-white font-bold text-2xl inline-flex items-center space-x-2">
                              <span>{result.length}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h1 class="font-bold py-4 uppercase">Analytic</h1>
                    <div id="stats" class="grid grid-cols-1 gap-6">
                      <canvas ref={barChartRef} className="w-full"></canvas>
                    </div>
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
