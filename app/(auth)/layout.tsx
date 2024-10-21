"use client";
import { AuthContext } from "@/context/authContext";
import { AuthContextInterface } from "@/interface";
import { url } from "inspector";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { ReactNode, useContext, useEffect } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useContext(AuthContext) as AuthContextInterface;
  const { push } = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      return push("/dashboard");
    }
  }, [isAuthenticated]);

  return (
    <div className="grid grid-cols-2 min-h-screen">
      <div className="px-10 py-5 flex flex-col col-span-2 lg:col-span-1 gap-2 w-full items-center justify-center">
        {children}
      </div>
      <div
        style={{
          backgroundImage: 'url("/AuthLayoutImage.jpg")', // Fix the backgroundImage URL
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="hidden lg:block" // Hide on small screens if needed
      ></div>
    </div>
  );
};

export default AuthLayout;
