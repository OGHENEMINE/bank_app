import AdminSideBar from "@/components/me/AdminSideBar";
import SideBarItem from "@/components/me/SideBarItem";
import {
  AlignCenter,
  ArrowLeftRight,
  Bell,
  Home,
  KeySquare,
  LayoutDashboard,
  ShieldCheck,
  UserCheck,
  Wallet,
} from "lucide-react";
import { ReactNode, useState } from "react";
import UserAvatar from "./UserAvatar";
import Link from "next/link";
import { Button } from "../ui/button";

const AdminDashboardLayout = ({ children }: { children?: ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <main className="grid grid-cols-10 min-h-screen bg-[#f7f7f7]">
      <AdminSideBar open={open} setOpen={setOpen}>
        <SideBarItem
          onClick={() => setOpen(!open)}
          path="/dashboard"
          icon={<LayoutDashboard size={18} />}
          text="Dashboard"
        />
        <SideBarItem
          onClick={() => setOpen(!open)}
          path="/users"
          icon={<UserCheck size={18} />}
          text="Users"
        />
        <SideBarItem
          onClick={() => setOpen(!open)}
          path="/admin/accounts"
          icon={<ShieldCheck size={18} />}
          text="Accounts"
        />
        <SideBarItem
          onClick={() => setOpen(!open)}
          path="/admin/transactions"
          icon={<ArrowLeftRight size={18} />}
          text="Transactions"
        />
        <SideBarItem
          onClick={() => setOpen(!open)}
          path="/wallets"
          icon={<Wallet size={18} />}
          text="Wallets"
        />
        <SideBarItem
          onClick={() => setOpen(!open)}
          path="/tokens"
          icon={<KeySquare size={18} />}
          text="Tokens"
        />
      </AdminSideBar>
      <div className="col-span-10 md:col-span-8 md:col-start-3">
        <nav className="shadow px-5 py-2.5 flex items-center justify-between">
          <Button
            onClick={() => setOpen(!open)}
            variant="ghost"
            className="md:hidden"
            size="sm"
          >
            <AlignCenter />
          </Button>
          <Link
            className="max-sm:hidden font-medium flex items-center gap-0.5"
            href="/"
          >
            <Home size={18} />
            Home
          </Link>
          <h1 className="text-2xl tracking-wide font-bold text-center w-full">
            Administrator
          </h1>
          <div className="flex items-center gap-3">
            <span className="border border-gray-300 rounded-full p-2">
              <Bell size={18} />
            </span>
            <UserAvatar />
          </div>
        </nav>
        {children}
      </div>
    </main>
  );
};

export default AdminDashboardLayout;
