"use client"
import AdminDashboardLayout from "@/components/me/AdminDashboardLayout";
import { AuthContext } from "@/context/authContext";
import { AuthContextInterface } from "@/Interface";
import { useRouter } from "next/navigation";
import React, { ReactNode, useCallback, useContext, useEffect } from "react";

const AdminLayout = ({children}: {children: ReactNode}) => {
  const { user } = useContext(AuthContext) as AuthContextInterface;
  const { back } = useRouter();

  const handleRouting = useCallback(() => {
    if (user.role !== "admin") {
      back();
    }
  }, [user.role, back]);

  useEffect(() => {
    if (user.role) {
      handleRouting();
    }
  }, [user.role, handleRouting]);

  return <AdminDashboardLayout>{children}</AdminDashboardLayout>;;
};

export default AdminLayout;
