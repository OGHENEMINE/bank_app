"use client";
import { AuthContext } from "@/context/authContext";
import { AuthContextInterface } from "@/Interface";
import { useRouter } from "next/navigation";
import { ReactNode, useCallback, useContext, useEffect } from "react";

const GeneralLayout = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, checkUser } = useContext(
    AuthContext
  ) as AuthContextInterface;
  const { push } = useRouter();
  
  const handleRouting = useCallback(() => {
    if (isAuthenticated) {
      return push("/login");
    }
  }, [isAuthenticated, push]);

  useEffect(() => {
    if (isAuthenticated) {
      handleRouting();
    }
  }, [isAuthenticated, handleRouting]);


  return <div>{children}</div>;
};

export default GeneralLayout;
