"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader, ShieldAlert, Users as UserIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import AdminDashboardLayout from "@/components/me/AdminDashboardLayout";
import { getSystemData } from "./actions";

const AdminDashboard = () => {
  const [isLoading, setLoading] = useState(true); // Initialize loading state to true
  const [info, setInfo] = useState({
    activeUsers: 0,
    pendingApprovals: 0,
  });

  const handleDBQuery = useCallback(() => {
    const fetchAppAdminInfo = async () => {
      try {
        const { users, transactions } = await getSystemData();
        if (!users) {
          console.error("Cannot access users");
          return;
        }
        setInfo(prevInfo => ({
          ...prevInfo,
          activeUsers: users.length,
          pendingApprovals: transactions.length,
        }));
      } catch (error) {
        console.error("Error fetching admin info:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchAppAdminInfo();
  }, []); // Removed `info` from dependencies
  
  useEffect(() => {
    handleDBQuery(); 
  }, [handleDBQuery]);
  

  return (
    <AdminDashboardLayout>
      <div className="flex items-center gap-5 m-5">
        {[
          {
            title: "Active Users",
            icon: <UserIcon size={20} />,
            number: info.activeUsers,
            link: "/users",
          },
          {
            title: "Pending Approvals",
            icon: <ShieldAlert size={20} />,
            number: info.pendingApprovals,
            link: "/admin/transactions",
          },
        ].map(({ title, icon, number, link }, index) => (
          <Card
            key={index}
            className="w-full md:w-[50%] lg:w-[25%] p-3 hover:bg-gray-50 hover:shadow relative space-y-3"
          >
            <CardHeader className="p-0">
              <CardTitle className="text-lg flex items-center gap-3 tracking-wide">
                <span
                  className={`p-1.5 inline-block rounded-md ${
                    index === 0
                      ? "bg-purple-600/20 text-purple-800"
                      : "bg-pink-600/20 text-pink-800"
                  }`}
                >
                  {icon}
                </span>
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 relative text-center pb-2.5 flex items-center justify-center">
              {isLoading ? (
                <Loader size={20} className="animate-spin text-primary" />
              ) : (
                <p className="text-xl">{number}</p>
              )}
            </CardContent>
            <Link
              className="absolute inset-0 capitalize text-xs font-light tracking-widest text-gray-600 flex items-end justify-center"
              href={link}
            >
              click card
            </Link>
          </Card>
        ))}
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminDashboard;
