"use client";
import { ArrowLeftRight, Headset, Lock, TabletSmartphone, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import HomeNav from "./HomeNav";
import { AuthContext } from "@/context/authContext";
import { AuthContextInterface } from "@/Interface";

const HomePageHeader = () => {
  const { isAuthenticated } = useContext(AuthContext) as AuthContextInterface;

  return (
    <header className="py-10 md:px-28 px-5">
      <HomeNav />
      <div className="pt-20 md:pt-16 flex md:flex-col lg:flex-row items-center justify-between">
        <div className="md:order-2 lg:order-1 w-full lg:w-1/2 space-y-6 md:space-y-5">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light">
            <span className="text-primary font-bold">Welcome to StarLight</span>{" "}
            - Redefining Modern Banking.
          </h1>
          <p>
            Unleash the power of your financial future with StarLight
            Banking—where credibility shapes success. Start your journey to
            prosperity with us today.
          </p>
          <Link
            href={isAuthenticated ? "/customer/accounts" : "/login"}
            className="tracking-widest inline-block bg-primary shadow rounded py-2.5 px-5 text-white"
          >
            Create an account
          </Link>
        </div>
        <div className="w-full max-sm:hidden lg:w-1/2 md:order-1 lg:order-2 relative h-[450px]">
          <Image
            src="/HeaderImage.svg"
            alt="banking illustration"
            layout="fill"
            objectFit="cover"
            className="mx-auto"
          />
        </div>
      </div>

      {/* FLOAT */}
      <div className="flex items-center justify-between text-sm text-center mt-10 rounded-md tracking-wider">
        <div className="p-2 font-bold tracking-wider space-y-2 text-center w-full">
          <div className="w-fit mx-auto border rounded-md p-1.5 border-primary">
            <Zap size={18} />
          </div>
          <p>Instant Transactions</p>
        </div>
        <div className="p-2 space-y-2 font-bold tracking-wider text-center w-full">
          <div className="w-fit mx-auto border rounded-md p-1.5 border-primary">
            <Lock size={18} />
          </div>
          <p>100% Secure</p>
        </div>
        <div className="p-2 font-bold tracking-wider space-y-2 text-center w-full">
          <div className="rounded-md w-fit p-1.5 border border-primary mx-auto">
            <Headset size={18} />
          </div>
          <p>24/7 Support</p>
        </div>
        <div className="p-2 font-bold tracking-wider space-y-2 text-center w-full">
          <div className="rounded-md w-fit p-1.5 border border-primary mx-auto">
            <TabletSmartphone size={18} />
          </div>
          <p>Mobile Banking</p>
        </div>
        <div className="p-2 font-bold tracking-wider space-y-2 text-center w-full">
          <div className="w-fit mx-auto border rounded-md p-1.5 border-primary">
            <ArrowLeftRight size={18} />
          </div>
          <p>Quick Transfer</p>
        </div>
      </div>
    </header>
  );
};

export default HomePageHeader;
