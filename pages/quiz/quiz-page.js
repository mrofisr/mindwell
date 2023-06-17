import { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const QuizPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState([]);
  const router = useRouter();
  //   const questions = [
  //     {
  //       code: "G01",
  //       question:
  //         "Apakah Anda kehilangan ketertarikan atau motivasi untuk melakukan sesuatu?",
  //     },
  //     {
  //       code: "G02",
  //       question:
  //         "Apakah Anda terus-menerus merasa sedih, bahkan terus-menerus menangis?",
  //     },
  //     {
  //       code: "G03",
  //       question: "Apakah Anda merasa sangat bersalah dan khawatir berlebihan?",
  //     },
  //     {
  //       code: "G04",
  //       question:
  //         "Apakah Anda merasa tidak dapat menikmati hidup karena kehilangan rasa percaya diri?",
  //     },
  //     {
  //       code: "G05",
  //       question:
  //         "Apakah Anda mengalami kesulitan membuat keputusan dan mudah tersinggung?",
  //     },
  //     {
  //       code: "G06",
  //       question: "Apakah Anda merasa acuh terhadap orang lain?",
  //     },
  //     {
  //       code: "G07",
  //       question:
  //         "Apakah Anda memiliki pikiran untuk menyakiti diri sendiri atau bunuh diri?",
  //     },
  //     {
  //       code: "G08",
  //       question:
  //         "Apakah Anda mengalami gangguan tidur dan merasa tubuh terasa lemah?",
  //     },
  //     {
  //       code: "G09",
  //       question: "Apakah bicara atau gerakan Anda menjadi lebih lambat?",
  //     },
  //     {
  //       code: "G10",
  //       question:
  //         "Apakah Anda mengalami perubahan siklus menstruasi (jika Anda seorang wanita)?",
  //     },
  //     {
  //       code: "G11",
  //       question: "Apakah Anda mengalami sembelit?",
  //     },
  //     {
  //       code: "G12",
  //       question: "Apakah nafsu makan Anda turun atau meningkat secara drastis?",
  //     },
  //     {
  //       code: "G13",
  //       question: "Apakah Anda merasakan sakit atau nyeri tanpa sebab?",
  //     },
  //     {
  //       code: "G14",
  //       question:
  //         "Apakah Anda sering merasa cemas atau gelisah pada berbagai situasi, bukan hanya pada kejadian tertentu?",
  //     },
  //     {
  //       code: "G15",
  //       question:
  //         "Apakah Anda mengalami berkurangnya rasa percaya diri secara umum?",
  //     },
  //     {
  //       code: "G16",
  //       question: "Apakah Anda mudah marah atau stres dengan cepat?",
  //     },
  //     {
  //       code: "G17",
  //       question:
  //         "Apakah Anda sulit berkonsentrasi dan merasa tidak dapat fokus dengan baik?",
  //     },
  //     {
  //       code: "G18",
  //       question:
  //         "Apakah Anda cenderung menjadi penyendiri atau menghindari interaksi sosial?",
  //     },
  //     {
  //       code: "G19",
  //       question:
  //         "Apakah Anda mengalami kesulitan tidur, seperti sulit memulai tidur atau sering terbangun di malam hari?",
  //     },
  //     {
  //       code: "G20",
  //       question:
  //         "Apakah Anda sering merasa gemetar atau bergetar pada tubuh Anda?",
  //     },
  //     {
  //       code: "G21",
  //       question:
  //         "Apakah Anda mengalami keringat berlebihan tanpa alasan yang jelas?",
  //     },
  //     {
  //       code: "G22",
  //       question: "Apakah otot-otot Anda terasa tegang atau kaku?",
  //     },
  //     {
  //       code: "G23",
  //       question:
  //         "Apakah Anda merasakan detak jantung yang cepat atau berdebar-debar?",
  //     },
  //     {
  //       code: "G24",
  //       question: "Apakah Anda sering merasa sesak napas atau sulit bernapas?",
  //     },
  //     {
  //       code: "G25",
  //       question: "Apakah Anda merasa lelah dan kehilangan energi dengan cepat?",
  //     },
  //     {
  //       code: "G26",
  //       question:
  //         "Apakah Anda sering mengalami sakit perut atau sakit kepala yang tidak dapat dijelaskan secara medis?",
  //     },
  //     {
  //       code: "G27",
  //       question: "Apakah Anda sering merasa dizziness atau melayang?",
  //     },
  //     {
  //       code: "G28",
  //       question: "Apakah Anda merasakan mulut kering secara berlebihan?",
  //     },
  //     {
  //       code: "G29",
  //       question: "Apakah Anda mengalami sensasi kesemutan pada tubuh Anda?",
  //     },
  //     {
  //       code: "G30",
  //       question:
  //         "Apakah Anda memiliki riwayat trauma atau pengalaman intimidasi, pelecehan, atau kekerasan?",
  //     },
  //     {
  //       code: "G31",
  //       question:
  //         "Apakah Anda mengalami tingkat stres yang tinggi dalam jangka waktu yang lama?",
  //     },
  //     {
  //       code: "G32",
  //       question:
  //         "Apakah ada riwayat keluarga dengan gangguan kecemasan atau masalah kesehatan mental lainnya?",
  //     },
  //     {
  //       code: "G33",
  //       question:
  //         "Apakah Anda menggunakan minuman beralkohol atau obat-obatan terlarang secara berlebihan?",
  //     },
  //     {
  //       code: "G34",
  //       question:
  //         "Apakah Anda sering menjadi penyendiri dan enggan berinteraksi dengan orang lain?",
  //     },
  //     {
  //       code: "G35",
  //       question:
  //         "Apakah Anda mengalami perubahan pola makan, seperti enggan makan atau makan secara berlebihan?",
  //     },
  //     {
  //       code: "G36",
  //       question:
  //         "Apakah Anda sering merasa marah-marah dan sulit mengendalikan kemarahan?",
  //     },
  //     {
  //       code: "G37",
  //       question: "Apakah Anda merokok atau mengonsumsi rokok secara berlebihan?",
  //     },
  //     {
  //       code: "G38",
  //       question: "Apakah Anda mengonsumsi minuman beralkohol secara berlebihan?",
  //     },
  //     {
  //       code: "G39",
  //       question:
  //         "Apakah Anda memiliki riwayat penyalahgunaan obat-obatan narkotika?",
  //     },
  //     {
  //       code: "G40",
  //       question:
  //         "Apakah Anda mengalami gangguan tidur, seperti sulit tidur atau sering terbangun di malam hari?",
  //     },
  //     {
  //       code: "G41",
  //       question: "Apakah Anda merasa lelah secara berlebihan?",
  //     },
  //     {
  //       code: "G42",
  //       question:
  //         "Apakah Anda sering mengalami sakit kepala yang tidak dapat dijelaskan secara medis?",
  //     },
  //     {
  //       code: "G43",
  //       question:
  //         "Apakah Anda sering mengalami sakit perut yang tidak dapat dijelaskan secara medis?",
  //     },
  //     {
  //       code: "G44",
  //       question:
  //         "Apakah Anda mengalami nyeri dada atau ketegangan pada otot-otot tubuh?",
  //     },
  //     {
  //       code: "G45",
  //       question:
  //         "Apakah Anda mengalami penurunan gairah seksual atau masalah dalam kehidupan seksual Anda?",
  //     },
  //     {
  //       code: "G46",
  //       question: "Apakah Anda mengalami kelebihan berat badan atau obesitas?",
  //     },
  //     {
  //       code: "G47",
  //       question:
  //         "Apakah Anda memiliki riwayat hipertensi atau tekanan darah tinggi?",
  //     },
  //     {
  //       code: "G48",
  //       question:
  //         "Apakah Anda memiliki riwayat diabetes atau masalah gula darah?",
  //     },
  //     {
  //       code: "G49",
  //       question:
  //         "Apakah Anda memiliki riwayat gangguan jantung atau masalah kardiovaskular?",
  //     },
  //     {
  //       code: "G50",
  //       question:
  //         "Apakah Anda mengalami tekanan atau tuntutan dalam pekerjaan atau kehidupan sehari-hari?",
  //     },
  //     {
  //       code: "G51",
  //       question:
  //         "Apakah Anda mengalami masalah keuangan yang dapat menyebabkan stres?",
  //     },
  //     {
  //       code: "G52",
  //       question:
  //         "Apakah Anda mengalami masalah dalam hubungan sosial atau interpersonal?",
  //     },
  //     {
  //       code: "G53",
  //       question:
  //         "Apakah Anda merasa sulit mengatasi permasalahan atau menemukan solusi untuk mengurangi stres?",
  //     },
  //   ];
    //   const questions = [
    //     {
    //       question:
    //         "Apakah Anda kehilangan ketertarikan atau motivasi untuk melakukan sesuatu?",
    //       yes: 1,
    //       no: 4,
    //     },
    //     {
    //       question:
    //         "Apakah Anda terus-menerus merasa sedih, bahkan terus-menerus menangis?",
    //       yes: 2,
    //       no: 4,
    //     },
    //     {
    //       question: "Apakah Anda merasa sangat bersalah dan khawatir berlebihan?",
    //       yes: 3,
    //       no: 4,
    //     },
    //     {
    //       question:
    //         "Apakah Anda merasa tidak dapat menikmati hidup karena kehilangan rasa percaya diri?",
    //       yes: 4,
    //       no: 5,
    //     },
    //     {
    //       question:
    //         "Apakah Anda mengalami kesulitan membuat keputusan dan mudah tersinggung?",
    //       yes: 5,
    //       no: 6,
    //     },
    //     {
    //       question: "Apakah Anda merasa acuh terhadap orang lain?",
    //       yes: 6,
    //       no: 7,
    //     },
    //     {
    //       question:
    //         "Apakah Anda memiliki pikiran untuk menyakiti diri sendiri atau bunuh diri?",
    //       yes: 7,
    //       no: 8,
    //     },
    //     {
    //       question:
    //         "Apakah Anda mengalami gangguan tidur dan merasa tubuh terasa lemah?",
    //       yes: 8,
    //       no: 9,
    //     },
    //     {
    //       question: "Apakah bicara atau gerakan Anda menjadi lebih lambat?",
    //       yes: 9,
    //       no: 10,
    //     },
    //     {
    //       question:
    //         "Apakah Anda mengalami perubahan siklus menstruasi (jika Anda seorang wanita)?",
    //       yes: 10,
    //       no: 11,
    //     },
    //     {
    //       question: "Apakah Anda mengalami sembelit?",
    //       yes: 11,
    //       no: 12,
    //     },
    //     {
    //       question: "Apakah nafsu makan Anda turun atau meningkat secara drastis?",
    //       yes: 12,
    //       no: 13,
    //     },
    //     {
    //       question: "Apakah Anda merasakan sakit atau nyeri tanpa sebab?",
    //       yes: 13,
    //       no: 14,
    //     },
    //     {
    //       question:
    //         "Apakah Anda sering merasa cemas atau gelisah pada berbagai situasi, bukan hanya pada kejadian tertentu?",
    //       yes: 14,
    //       no: 15,
    //     },
    //     {
    //       question:
    //         "Apakah Anda mengalami berkurangnya rasa percaya diri secara umum?",
    //       yes: 15,
    //       no: 16,
    //     },
    //     {
    //       question: "Apakah Anda mudah marah atau stres dengan cepat?",
    //       yes: 16,
    //       no: 17,
    //     },
    //     {
    //       question:
    //         "Apakah Anda sulit berkonsentrasi dan merasa tidak dapat fokus dengan baik?",
    //       yes: 17,
    //       no: 18,
    //     },
    //     {
    //       question:
    //         "Apakah Anda cenderung menjadi penyendiri atau menghindari interaksi sosial?",
    //       yes: 18,
    //       no: 19,
    //     },
    //     {
    //       question:
    //         "Apakah Anda mengalami kesulitan tidur, seperti sulit memulai tidur atau sering terbangun di malam hari?",
    //       yes: 19,
    //       no: 20,
    //     },
    //     {
    //       question:
    //         "Apakah Anda sering merasa gemetar atau bergetar pada tubuh Anda?",
    //       yes: 20,
    //       no: 21,
    //     },
    //     {
    //       question:
    //         "Apakah Anda mengalami keringat berlebihan tanpa alasan yang jelas?",
    //       yes: 21,
    //       no: 22,
    //     },
    //     {
    //       question: "Apakah otot-otot Anda terasa tegang atau kaku?",
    //       yes: 22,
    //       no: 23,
    //     },
    //     {
    //       question:
    //         "Apakah Anda merasakan detak jantung yang cepat atau berdebar-debar?",
    //       yes: 23,
    //       no: 24,
    //     },
    //     {
    //       question: "Apakah Anda sering merasa sesak napas atau sulit bernapas?",
    //       yes: 24,
    //       no: 25,
    //     },
    //     {
    //       question:
    //         "Apakah Anda sering merasa lelah dan kehilangan energi dengan cepat?",
    //       yes: 25,
    //       no: 26,
    //     },
    //     {
    //       question:
    //         "Apakah Anda sering mengalami sakit perut atau sakit kepala yang tidak dapat dijelaskan secara medis?",
    //       yes: 26,
    //       no: 27,
    //     },
    //     {
    //       question: "Apakah Anda sering merasa dizziness atau melayang?",
    //       yes: 27,
    //       no: 28,
    //     },
    //     {
    //       question: "Apakah Anda merasakan mulut kering secara berlebihan?",
    //       yes: 28,
    //       no: 29,
    //     },
    //     {
    //       question: "Apakah Anda mengalami sensasi kesemutan pada tubuh Anda?",
    //       yes: 29,
    //       no: 30,
    //     },
    //     {
    //       question:
    //         "Apakah Anda memiliki riwayat trauma atau pengalaman intimidasi, pelecehan, atau kekerasan?",
    //       yes: 30,
    //       no: 31,
    //     },
    //     {
    //       question:
    //         "Apakah Anda mengalami tingkat stres yang tinggi dalam jangka waktu yang lama?",
    //       yes: 31,
    //       no: 32,
    //     },
    //     {
    //       question:
    //         "Apakah ada riwayat keluarga dengan gangguan kecemasan atau masalah kesehatan mental lainnya?",
    //       yes: 32,
    //       no: 33,
    //     },
    //     {
    //       question:
    //         "Apakah Anda menggunakan minuman beralkohol atau obat-obatan terlarang secara berlebihan?",
    //       yes: 33,
    //       no: 34,
    //     },
    //     {
    //       question:
    //         "Apakah Anda sering menjadi penyendiri dan enggan berinteraksi dengan orang lain?",
    //       yes: 34,
    //       no: 35,
    //     },
    //     {
    //       question:
    //         "Apakah Anda mengalami perubahan pola makan, seperti enggan makan atau makan secara berlebihan?",
    //       yes: 35,
    //       no: 36,
    //     },
    //     {
    //       question:
    //         "Apakah Anda sering merasa marah-marah dan sulit mengendalikan kemarahan?",
    //       yes: 36,
    //       no: 37,
    //     },
    //     {
    //       question: "Apakah Anda merokok atau mengonsumsi rokok secara berlebihan?",
    //       yes: 37,
    //       no: 38,
    //     },
    //     {
    //       question:
    //         "Apakah Anda mengonsumsi minuman berkafein dalam jumlah yang berlebihan?",
    //       yes: 38,
    //       no: 39,
    //     },
    //     {
    //       question:
    //         "Apakah Anda merasa cemas atau gelisah secara terus-menerus tanpa alasan yang jelas?",
    //       yes: 39,
    //       no: 40,
    //     },
    //     {
    //       question:
    //         "Apakah Anda sering mengalami gangguan tidur, seperti sulit tidur atau terbangun dalam tidur?",
    //       yes: 40,
    //       no: null,
    //     },
    //   ];

  const handleAnswer = (answer) => {
    const currentQuestion = questions[currentIndex];

    if (answer === "yes") {
      if (Number.isInteger(currentQuestion.yes)) {
        setCurrentIndex(currentQuestion.yes);
      } else {
        const result = determineResult();
        showResult(result);
      }
    } else if (answer === "no") {
      if (Number.isInteger(currentQuestion.no)) {
        setCurrentIndex(currentQuestion.no);
      } else {
        const result = determineResult();
        showResult(result);
      }
    }
  };

  const determineResult = () => {
    const symptoms = results.map((result) => `G${result}`).join(", ");
    // Rule untuk menentukan hasil berdasarkan gejala yang terpenuhi
    if (
      symptoms.includes("G01") &&
      symptoms.includes("G02") &&
      symptoms.includes("G03") &&
      symptoms.includes("G04") &&
      symptoms.includes("G05") &&
      symptoms.includes("G06") &&
      symptoms.includes("G07") &&
      symptoms.includes("G08") &&
      symptoms.includes("G09") &&
      symptoms.includes("G10") &&
      symptoms.includes("G11") &&
      symptoms.includes("G12") &&
      symptoms.includes("G13")
    ) {
      return "Depresi";
    } else if (
      symptoms.includes("G13") &&
      symptoms.includes("G14") &&
      symptoms.includes("G15") &&
      symptoms.includes("G16") &&
      symptoms.includes("G17") &&
      symptoms.includes("G18") &&
      symptoms.includes("G19") &&
      symptoms.includes("G20") &&
      symptoms.includes("G21") &&
      symptoms.includes("G22") &&
      symptoms.includes("G23") &&
      symptoms.includes("G24") &&
      symptoms.includes("G25") &&
      symptoms.includes("G26") &&
      symptoms.includes("G27") &&
      symptoms.includes("G28") &&
      symptoms.includes("G29") &&
      symptoms.includes("G30") &&
      symptoms.includes("G31") &&
      symptoms.includes("G32")
    ) {
      return "Gangguan Kecemasan";
    } else if (
      symptoms.includes("G40") &&
      symptoms.includes("G41") &&
      symptoms.includes("G42") &&
      symptoms.includes("G43") &&
      symptoms.includes("G44") &&
      symptoms.includes("G45") &&
      symptoms.includes("G46") &&
      symptoms.includes("G47") &&
      symptoms.includes("G48") &&
      symptoms.includes("G49") &&
      symptoms.includes("G50") &&
      symptoms.includes("G51") &&
      symptoms.includes("G52") &&
      symptoms.includes("G53")
    ) {
      return "Stres";
    } else {
      return "Normal";
    }
  };

  const showResult = (result) => {
    Swal.fire({
      icon: "info",
      title: "Result",
      text: result,
      showConfirmButton: true,
      width: 350,
      heightAuto: true,
    }).then(() => {
      //   router.push("/quiz/history");
    });
    setResults([]);
  };

  const currentQuestion = questions[currentIndex];

  return (
    <div>
      <h1>Quiz</h1>
      <p>{currentQuestion.question}</p>
      <button onClick={() => handleAnswer("yes")}>Yes</button>
      <button onClick={() => handleAnswer("no")}>No</button>
    </div>
  );
};

export default QuizPage;
