import firebase_app from "@/src/firebase/config";
import { getAuth } from "firebase/auth";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const DetailProfile = () => {
  const auth = getAuth(firebase_app);
  const user = auth.currentUser;
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
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        window.location.href = "/login";
      }
    });
  }, []);
  const [selectedCategory, setSelectedCategory] = useState(
    "Fakultas Ekonomi dan Bisnis Islam"
  );
  const [subjects, setSubjects] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const years = Array.from(
    { length: 8 },
    (_, i) => new Date().getFullYear() - i
  );
  useEffect(() => {
    const selectedData = data.find((x) => x.category === selectedCategory);
    setSubjects(selectedData ? selectedData.subjects : []);
  }, [selectedCategory]);
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  return (
    <>
      <div className="mx-4 my-5">
        <Image
          src="/mindwell.png"
          className="object-center"
          width={100}
          height={33}
          alt="Logo"
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
                  onChange={handleCategoryChange}
                  className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
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
            <button className="bg-rose-400 text-white font-bold py-2 px-4 border-b-4 border-rose-500 w-full rounded-lg">
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default DetailProfile;
