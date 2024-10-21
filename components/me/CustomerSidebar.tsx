"use client";
import { ReactNode, useContext } from "react";
import { LogOut, MoreVertical, X } from "lucide-react";
import { AuthContext } from "@/context/authContext";
import Image from "next/image";
import { Button } from "../ui/button";
import { AuthContextInterface } from "@/Interface";

const CustomerSidebar = ({
  children,
  open,
  setOpen,
}: {
  children: ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const { user, handleLogOut } = useContext(
    AuthContext
  ) as AuthContextInterface;
  return (
    <aside
      className={`w-full max-sm:bg-white z-10 md:w-1/6 md:h-full md:px-2 shadow fixed top-0 left-0 px-5 py-10 md:pt-10 md:pb-2 ${
        open ? "" : "max-sm:hidden"
      }`}
    >
      <nav className="h-full flex flex-col">
        <div className="flex max-sm:items-center justify-center max-sm:justify-between">
          <Image
            src={process.env.NEXT_PUBLIC_SITE_LOGO!}
            alt="Site logo"
            width={150}
            height={100}
          />

          <Button className="md:hidden" onClick={() => setOpen(!open)} variant="outline">
            <X size={15} />
          </Button>
        </div>

        <ul className="flex-1 text-sm mt-8 space-y-2">{children}</ul>

        <div className="flex items-center gap-3 mt-5">
          {/* <img src={user.imageUrl} className="h-10 w-10 rounded-md" /> */}
          <Button
            onClick={handleLogOut}
            variant="outline"
            className="mx-auto tracking-wider max-sm:w-full flex items-center gap-2 shadow"
          >
            Log Out
            <LogOut size={15} />
          </Button>
        </div>
      </nav>
    </aside>
  );
};

export default CustomerSidebar;
