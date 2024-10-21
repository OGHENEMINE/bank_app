"use client";
import { AuthContext } from "@/context/authContext";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { Button } from "../ui/button";
import { AlignJustify, LogOut } from "lucide-react";
import UserAvatar from "./UserAvatar";
import { AuthContextInterface } from "@/Interface";
import HeaderPage from "../../public/HomePage.png";

const HomeNav = () => {
  const { isAuthenticated, handleLogOut, isLoading } = useContext(
    AuthContext
  ) as AuthContextInterface;

  return (
    <>
      <nav className="fixed bg-white shadow w-full z-10 top-0 left-0 max-sm:px-4 md:px-28 py-4 flex items-start justify-between">
        <div className="md:hidden">
          <Image
            src={process.env.NEXT_PUBLIC_SITE_LOGO!}
            alt="Site logo"
            width={120}
            height={100}
          />
        </div>
        <div className="max-sm:hidden">
          <Image
            src={process.env.NEXT_PUBLIC_SITE_LOGO!}
            alt="Site logo"
            width={150}
            height={100}
          />
        </div>
        <div className="flex items-center gap-2 tracking-wider font-medium">
          {isAuthenticated && (
            <>
              <Button
                className="shadow-md p-3 flex items-center gap-1"
                onClick={handleLogOut}
              >
                <span>Log Out</span>
                <LogOut size={15} />
              </Button>
              <Link href="/dashboard">
                <UserAvatar />
              </Link>
            </>
          )}
          {!isAuthenticated && (
            <>
              <Link
                className="shadow-lg py-2.5 px-4 bg-primary hover:bg-primary/95 text-white hover:rounded-md transition-all duration-500 ease-in-out"
                href="/login"
              >
                SIGN IN
              </Link>
              <Link
                className="shadow-lg py-2.5 px-4 bg-primary hover:bg-primary/95 text-white hover:rounded-md transition-all duration-500 ease-in-out"
                href="/register"
              >
                SIGN UP
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default HomeNav;
