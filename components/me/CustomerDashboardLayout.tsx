import CustomerSidebar from "@/components/me/CustomerSidebar";
import SideBarItem from "@/components/me/SideBarItem";
import {
  AlignCenter,
  ArrowLeftRight,
  BadgeDollarSign,
  LayoutDashboard,
} from "lucide-react";
import { ReactNode, useState } from "react";
import { Button } from "../ui/button";

const CustomerDashboardLayout = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    // bg-[#f7f7f7]
    <main className="flex items-start min-h-screen bg-[#f7f7f7] ">
      <CustomerSidebar open={open} setOpen={setOpen}>
        <SideBarItem
          path="/dashboard"
          icon={<LayoutDashboard size={20} />}
          text="Dashboard"
        />
        <SideBarItem
          path="/deposit"
          icon={<BadgeDollarSign size={20} />}
          text="Deposit"
        />
        <SideBarItem
          path="/customer/transactions"
          icon={<ArrowLeftRight size={20} />}
          text="Transactions"
        />
        <SideBarItem
          path="/customer/accounts"
          icon={<ArrowLeftRight size={20} />}
          text="Accounts"
        />
      </CustomerSidebar>
      <div className="md:ml-[16.6667vw] p-4 w-full">
        <Button
          onClick={() => setOpen(!open)}
          variant="outline"
          className="md:hidden bg-inherit"
        >
          <AlignCenter size={20} />
        </Button>
        {children}
      </div>
    </main>
  );
};

export default CustomerDashboardLayout;
