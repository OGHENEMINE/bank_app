"use client";
import BreadcrumbComponent from "@/components/me/BreadCrumbComponent";
import UserAvatar from "@/components/me/UserAvatar";
import { Button } from "@/components/ui/button";
import { formatDateString } from "@/lib/formatDate";
import { LucideEdit, PlusCircle, Trash2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getSpecificUser } from "./actions";
import AdminAccountCard from "@/components/me/AdminAccountCard";
import { AccountInterface, UserInterface } from "@/Interface";

const UniqueUserComponent = () => {
  const { id } = useParams();
  const { back } = useRouter();
  const [user, setUser] = useState<UserInterface>({
    id: "",
    firstname: "",
    lastname: "",
    pin: "",
    email: "",
    role: "",
    registered: "",
  });
  const [accounts, setAccounts] = useState<AccountInterface[]>([]);
  useEffect(() => {
    const fetchSpecificUser = async () => {
      try {
        const { user, success, accounts } = await getSpecificUser(id as string);
        if (success) {
          setUser(user as UserInterface);
          setAccounts(accounts as AccountInterface[]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSpecificUser();
  }, [id]);

  const BreadCrumbItems = [
    {
      href: "/",
      text: "Home",
    },
    {
      href: "/users",
      text: "Back",
    },
  ];

  // console.log(id);

  return (
    <main className="min-h-screen bg-[#f7f7f7] py-5 px-5 md:px-28">
      <header className="flex flex-wrap gap-5 items-center justify-between">
        <BreadcrumbComponent
          items={BreadCrumbItems}
          currentPage={user?.firstname as string}
        />
        <div className="flex items-center gap-2">
          <UserAvatar
            fallback={user.firstname.charAt(0) + " " + user.lastname.charAt(0)}
          />
          <span className="font-medium tracking-widest capitalize">
            {user?.firstname} {""}
            {user?.lastname}
          </span>
        </div>
      </header>
      <section className="mt-5 md:mt-10 flex max-sm:flex-col gap-5 md:items-end justify-between border-b pb-6">
        {/* Left side */}
        <div className="space-y-3 font-light tracking-wider">
          <p>
            <span className="font-medium">Registered: </span>
            {user?.registered && formatDateString(user?.registered as string)}
          </p>
          <p>
            <span className="font-medium">Email: </span>
            {user?.email}
          </p>
        </div>
        {/* Right side */}
        <div className="space-y-3 font-medium tracking-wider">
          {/* <Button
            size="sm"
            className="text-xs flex items-center mb-3 md:float-end gap-1"
          >
            Notify <LucideEdit size={16} />
          </Button> */}
          <div className="flex items-center max-sm:justify-between gap-3 clear-both">
            <Link
              href={`/admin/edit/user/${id}`}
              className="text-xs shadow p-3 hover:rounded-md transition-all duration-300 bg-white flex items-center gap-1"
            >
              <LucideEdit size={16} />
              Edit UserInfo
            </Link>
            <Button
              size="sm"
              className="text-xs flex items-center gap-1"
              variant="destructive"
            >
              <Trash2 size={16} />
              Delete User
            </Button>
          </div>
        </div>
      </section>
      <section>
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg my-5">Accounts</h2>
          {id && (
            <Link
              className="bg-primary md:p-2 p-3 rounded-md text-white text-sm tracking-wider font-light shadow flex items-center gap-1"
              href={`/admin/new/account/${user?.id}`}
            >
              <PlusCircle size={20} />
              Add New Account
            </Link>
          )}
        </div>
        <div className="overflow-auto max-h-[50vh] h-full">
          {accounts.length > 0 ? (
            <AdminAccountCard accounts={accounts} />
          ) : (
            <p className="tracking-wider text-center text-gray-500">
              User does not have an account to display
            </p>
          )}
        </div>
      </section>
    </main>
  );
};

export default UniqueUserComponent;
