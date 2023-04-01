import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Test() {
  return (
    <>
      <div className="mx-4 my-5">
        <Image
          src="/next.svg"
          className="object-center"
          width={100}
          height={33}
          alt="Logo"
        />
      </div>
      <Navbar />
    </>
  );
}
