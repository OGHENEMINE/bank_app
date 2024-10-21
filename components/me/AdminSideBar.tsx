import { ReactNode, useContext } from "react";
import { Home, LogOut, X } from "lucide-react";
import { AuthContext } from "@/context/authContext";
import Image from "next/image";
import { AuthContextInterface } from "@/Interface";
import { Button } from "../ui/button";
import Link from "next/link";

const AdminSideBar = ({
  children,
  open,
  setOpen,
}: {
  children: ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const { handleLogOut } = useContext(AuthContext) as AuthContextInterface;

  return (
    <aside
      className={`px-5 md:px-3 shadow fixed top-0 left-0 bg-white md:bg-transparent w-full z-10 md:w-1/5 h-full md:col-span-2 pt-10 pb-10 md:pb-2 ${
        open ? "max-sm:" : "max-sm:hidden"
      }`}
    >
      <nav className="h-full flex flex-col">
        <div className="flex items-end justify-between">
          <Image
            src={process.env.NEXT_PUBLIC_SITE_LOGO!}
            alt="logo"
            width={100}
            height={100}
          />
          <div className="flex items-center">
            <Link
              className="md:hidden font-bold flex items-center underline gap-0.5"
              href="/"
            >
              <Home size={18} />
              Home
            </Link>
            <Button
              onClick={() => setOpen(!open)}
              variant="ghost"
              size="sm"
              className="md:hidden"
            >
              <X />
            </Button>
          </div>
        </div>
        <ul className="flex-1 text-sm mt-8 space-y-2">{children}</ul>
        <ul className="text-sm space-y-2 inline-block font-medium text-gray-700">
          <li
            onClick={handleLogOut}
            className="transition-colors cursor-pointer tracking-wider hover:bg-primary/10 hover:rounded-md hover:shadow p-2 hover:text-primary flex items-center max-sm:justify-center gap-2"
          >
            <LogOut size={18} /> Log Out
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSideBar;
