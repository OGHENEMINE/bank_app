"use client";
import { AuthContext } from "@/context/authContext";
import { AuthContextInterface } from "@/Interface";
import { redirect } from "next/navigation";
import { ReactNode, useContext, useEffect } from "react";

const GeneralLayout = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, checkUser } = useContext(
    AuthContext
  ) as AuthContextInterface;

  useEffect(() => {
    if (!isAuthenticated) {
      return redirect("/login");
    }
  }, [isAuthenticated]);

  return <div>{children}</div>;
};

export default GeneralLayout;
