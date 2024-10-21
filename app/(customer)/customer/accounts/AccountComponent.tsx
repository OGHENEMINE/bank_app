"use client";
import { AuthContext } from "@/context/authContext";
import { AccountInterface, AuthContextInterface } from "@/interface";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { getUserAccounts } from "./actions";
import CustomerAccountCard from "@/components/me/CustomerAccountCard";
import { toast } from "sonner";

const AccountComponent = () => {
  const { user } = useContext(AuthContext) as AuthContextInterface;
  const [accounts, setAccounts] = useState<AccountInterface[]>([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const { accounts, success, message } = await getUserAccounts(
          user.id as string
        );
        if (success) {
          setAccounts(accounts);
        } else {
          toast.error(message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAccounts();
  }, [user.id]);

  console.log(accounts);
  return (
    <section>
      <Link
        className="bg-primary w-fit text-muted py-2 px-3 font-light tracking-wider float-right clear-both rounded shadow flex items-center gap-1"
        href={`/new/account/${user.id}`}
      >
        Create new account <PlusCircle size={15} />
      </Link>
      <div className="clear-both text-lg tracking-wider pt-5 space-y-5">
        <h1 className="font-bold">All accounts</h1>
        <div>
          <CustomerAccountCard accounts={accounts} />
        </div>
      </div>
    </section>
  );
};

export default AccountComponent;
