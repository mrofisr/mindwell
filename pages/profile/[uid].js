import { Layout } from "@/components/Layout";
import firebase_app from "@/src/firebase/config";
import { deleteCookie, getCookie } from "cookies-next";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

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

const DetailProfile = () => {
  const auth = getAuth(firebase_app);
  const db = getFirestore(firebase_app);
  const data = [
    {
      category: "Fakultas Ekonomi dan Bisnis Islam",
      subjects: [
        "Akuntansi",
        "Manajemen",
        "Ekonomi Syariah",
        "Perbankan Syariah",
      ],
    },
    {
      category: "Fakultas Dakwah dan Komunikasi",
      subjects: ["Manajemen", "Ilmu Komunikasi", "Bimbingan dan Konseling"],
    },
    {
      category: "Fakultas Ilmu Sosial dan Politik",
      subjects: ["Sosiologi", "Ilmu Politik"],
    },
    {
      category: "Fakultas Psikologi dan Kesehatan",
      subjects: ["Gizi", "Psikologi"],
    },
    {
      category: "Fakultas Sains dan Teknologi",
      subjects: [
        "Matematika Murni",
        "Fisika Murni",
        "Kimia Murni",
        "Biologi Murni",
        "Pendidikan Fisika",
        "Pendidikan Kimia",
        "Pendidikan Biologi",
        "Pendidikan Matematika",
        "Teknik Lingkungan",
        "Teknologi Informasi",
      ],
    },
    {
      category: "Fakultas Syariah dan Hukum",
      subjects: ["Ilmu Hukum", "Ilmu Politik"],
    },
    {
      category: "Fakultas Usluhudin dan Humaniora",
      subjects: ["Filsafat", "Ilmu Agama Islam"],
    },
    {
      category: "Fakultas Ilmu Tarbiyah dan Keguruan",
      subjects: [
        "Ilmu Agama Islam",
        "Pendidikan Bahasa Inggris",
        "Pendidikan Anak Usia Dini (PAUD)",
        "Pendidikan Guru Sekolah Dasar",
        "Sastra Arab",
        "Manajemen Pendidikan",
      ],
    },
  ];
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedSubject, setSelectedSubject] = useState();
  const [subjects, setSubjects] = useState([]);
  const [userId, setUserId] = useState();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const years = Array.from(
    { length: 8 },
    (_, i) => new Date().getFullYear() - i
  );
  useEffect(() => {
    const selectedData = data.find((x) => x.category === selectedCategory);
    setSubjects(selectedData ? selectedData.subjects : []);
  }, [selectedCategory]);
  const fetchUser = async (uid) => {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setSelectedCategory(
          docSnap.data().faculty ?? "Fakultas Ekonomi dan Bisnis Islam"
        );
        setSelectedSubject(docSnap.data().majority);
        setSelectedYear(docSnap.data().year);
        setUserId(docSnap.data().uid);
      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.log(error);
    }
  };
  async function updateUserProfile(userId, faculty, majority, year) {
    try {
      const docRef = doc(db, "users", userId);
      const data = {
        faculty: faculty,
        majority: majority,
        year: year,
      };
      setDoc(docRef, data, { merge: true });
      Swal.fire({
        icon: "success",
        timer: 1000,
        heightAuto: true,
        width: 350,
        showCancelButton: false,
        showConfirmButton: false,
        showCloseButton: false,
        title: "Update Profile",
        text: "Profil berhasil diperbarui!",
      }).then(() => {
        // Reset the test back to the beginning
        window.location.href = "/profile";
      });
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  }
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (!authUser || !getCookie("auth")) {
        deleteCookie("auth");
        auth.signOut();
        router.push("/login");
      } else {
        // Get data from firestore
        fetchUser(authUser.uid);
      }
    });
  }, [auth]);
  return (
    <>
      <Layout>
        <div className="mx-4 my-5">
          <Image
            src="/mindwell.png"
            className="object-center"
            width={100}
            height={33}
            alt="Logo"
            onClick={() => router.push("/")}
          />
          <div className="mt-12">
            <form className="w-full max-w-lg">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block capitalize tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Fakultas
                  </label>
                  <select
                    onChange={(event) =>
                      setSelectedCategory(event.target.value)
                    }
                    className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-state"
                    value={selectedCategory}
                  >
                    {data.map((item) => (
                      <option key={item.category} value={item.category}>
                        {item.category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block capitalize tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Program Studi
                  </label>
                  <select
                    value={selectedSubject}
                    onChange={(event) => setSelectedSubject(event.target.value)}
                    className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-state"
                  >
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3 ">
                  <label
                    className="block capitalize tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Angkatan
                  </label>
                  <select
                    value={selectedYear}
                    onChange={(event) => setSelectedYear(event.target.value)}
                    className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-state"
                  >
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  updateUserProfile(
                    userId,
                    selectedCategory,
                    selectedSubject,
                    selectedYear
                  );
                }}
                className="bg-rose-400 text-white font-bold py-2 px-4 border-b-4 border-rose-500 w-full rounded-lg"
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};
export default DetailProfile;
