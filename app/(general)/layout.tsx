"use client";
import { AuthContext } from "@/context/authContext";
import { AuthContextInterface } from "@/interface";
import { useRouter } from "next/navigation";
import { ReactNode, useContext, useEffect } from "react";

const GeneralLayout = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, checkUser } = useContext(
    AuthContext
  ) as AuthContextInterface;
  const { push } = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      push("/login");
    }
  }, [isAuthenticated]);

  return <div>{children}</div>;
};

export default GeneralLayout;
