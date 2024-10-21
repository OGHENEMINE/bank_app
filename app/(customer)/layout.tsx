"use client"
import CustomerDashboardLayout from "@/components/me/CustomerDashboardLayout";
import { ReactNode } from "react";

const CustomerLayout = ({ children }: { children: ReactNode }) => {
  return <CustomerDashboardLayout>{children}</CustomerDashboardLayout>;
};

export default CustomerLayout;
