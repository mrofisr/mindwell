import TitlePage from "@/components/TitlePage";
import firebase_app from "@/src/firebase/config";
import { Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import LoadingPage from "@/components/Loading";
import { Transition } from "@headlessui/react";
import { deleteCookie, getCookie } from "cookies-next";
import { Layout } from "@/components/Layout";
import Navbar from "@/components/Navbar";

export async function getServerSideProps({ req, res }) {
  const auth = getCookie("auth", { req, res });
  if (!auth) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  // If the user is authenticated, return some data as props
  return {
    props: {
      data: "Some data for authenticated users",
    },
  };
}

const formatDate = (dateStr) => {
  const dateObj = new Date(dateStr);
  return format(dateObj, "EEEE, dd MMMM yyyy", { locale: id });
};

export default function HistoryQuiz() {
  const auth = getAuth(firebase_app);
  const user = auth.currentUser;
  const db = getFirestore(firebase_app);
  const [result, setResult] = useState([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (!authUser || !getCookie("auth")) {
        deleteCookie("auth");
        auth.signOut();
        router.push("/login");
      }
    });
    const getData = async () => {
      const docRef = doc(db, "sistem-pakar", "mental-health");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const allResults = docSnap.data().result;
        const filteredResults = allResults.filter(
          (result) => result.uid === user?.uid
        );
        setResult(filteredResults);
      } else {
        console.log("Document does not exist");
      }
      setIsLoading(false);
    };
    getData();
  }, [user]);
  return (
    <>
      <Layout>
        <div className="mx-4 my-5">
          {!isLoading ? (
            <div>
              <Image
                src="/mindwell.png"
                className="object-center"
                width={100}
                height={33}
                alt="Logo"
                onClick={() => router.push("/")}
              />
              <TitlePage title={"History Quiz"} />
              <Transition
                show={true}
                enter="transition-all ease-in-out duration-500 delay-[200ms]"
                enterFrom="opacity-0 translate-y-6"
                enterTo="opacity-100 translate-y-0"
                leave="transition-all ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                {result.map((item) => (
                  <div className="flex flex-col" key={item?.result_id}>
                    {item?.nama_penyakit !== "Tidak teridentifikasi" ? (
                      <Link href={"/quiz/history/" + item?.result_id}>
                        <div className="w-full mx-auto rounded-lg bg-white px-5 py-5 my-5 text-gray-800 border border-gray-200 flex flex-row shadow-md">
                          <img
                            src={`/ilustrations/${item.nama_penyakit.toLowerCase()}.png`}
                            className="h-28 w-28"
                          />
                          <div className="ml-4">
                            <div className="mb-3">
                              <h2 className="text-lg font-semibold text-gray-800 capitalize">
                                {item?.nama_penyakit}
                              </h2>

                              <p className="text-sm text-gray-500">
                                {formatDate(
                                  new Timestamp(
                                    item?.createdAt.seconds,
                                    item?.createdAt.nanoseconds
                                  ).toDate()
                                )}
                              </p>
                            </div>
                            <p className="text-sm text-justify line-clamp-4 text-gray-600">
                              {item?.deskripsi}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ) : (
                      <div className="w-full mx-auto rounded-lg bg-white px-5 py-5 my-5 text-gray-800 border border-gray-200 flex flex-row shadow-md">
                        <img
                          src="/ilustrations/psychology.png"
                          className="h-28 w-28"
                        />
                        <div className="ml-4">
                          <div className="mb-3">
                            <h2 className="text-lg font-semibold text-gray-800 capitalize">
                              {item?.nama_penyakit}
                            </h2>

                            <p className="text-sm text-gray-500">
                              {formatDate(
                                new Timestamp(
                                  item?.createdAt.seconds,
                                  item?.createdAt.nanoseconds
                                ).toDate()
                              )}
                            </p>
                          </div>
                          <p className="text-sm text-justify line-clamp-4 text-gray-600">
                            {item?.deskripsi}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </Transition>
            </div>
          ) : (
            <LoadingPage />
          )}
        </div>
        <Navbar />
      </Layout>
    </>
  );
}
