"use client"
import { AuthContext } from "@/context/authContext";
import { AuthContextInterface } from "@/Interface";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";


const HomePageSecondSection = () => {
    const { isAuthenticated } = useContext(AuthContext) as AuthContextInterface;

  return (
    <section className="my-10 max-sm:space-y-5 md:my-20 md:flex items-center justify-center">
      <Image
        src="/main.png"
        height={150}
        width={150}
        alt="Site mobile design"
        className="mx-auto"
      />
      <div className="text-center space-y-5 mx-auto md:w-3/5">
        <h2 className="text-5xl md:text-6xl font-bold">
          Step Into Your Financial Power
        </h2>
        <p>
          At StarLight, we strive to empower you with a seamless online banking
          experience tailored to your personal and business financial needs.
          With security and user-friendliness at the forefront, take control of
          your finances effortlessly, anytime, anywhere.
        </p>
        <Link
          href={isAuthenticated ? "/customer/accounts" : "/login"}
          className="tracking-widest inline-block bg-primary shadow rounded py-2.5 px-5 text-white"
        >
          Create an account
        </Link>
      </div>
    </section>
  );
};

export default HomePageSecondSection;
