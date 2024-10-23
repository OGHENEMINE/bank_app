"use client";
import { AuthContext } from "@/context/authContext";
import { useContext } from "react";
import CustomerDashboard from "./CustomerDashboard";
import AdminDashboard from "./AdminDashboard";
import { AuthContextInterface } from "@/Interface";

const DashboardComponent = () => {
  const { user } = useContext(AuthContext) as AuthContextInterface;

  return (
    <div>
      {user.role === "customer" && <CustomerDashboard />}
      {user.role === "admin" && <AdminDashboard />}
    </div>
  );
};

export default DashboardComponent;
