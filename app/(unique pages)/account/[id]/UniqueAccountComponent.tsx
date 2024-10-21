"use client";

import AdminTransactionCard from "@/components/me/AdminTransactionCard";
import BreadcrumbComponent from "@/components/me/BreadCrumbComponent";
import { Button } from "@/components/ui/button";
import { LucideEdit, PlusCircle, Trash2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getSpecificAccount } from "./actions";
import { toast } from "sonner";
import Link from "next/link";
import currencies from "@/lib/currency";
import { AccountInterface, TransactionInterface } from "@/Interface";

const UniqueAccountComponent = () => {
  const { id } = useParams();
  const [account, setAccount] = useState<AccountInterface>();
  const [transactions, setTransactions] = useState<TransactionInterface[]>([]);

  useEffect(() => {
    const fetchSpecificAccount = async () => {
      try {
        const { success, message, account, transactions } =
          await getSpecificAccount(id as string);
        console.log(transactions);
        if (success) {
          setAccount(account as AccountInterface);
          setTransactions(transactions as TransactionInterface[]);
        } else {
          toast.error(message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSpecificAccount();
  }, [id]);

  const BreadCrumbItems = [
    {
      href: "/",
      text: "Home",
    },
    {
      href: "/admin/accounts",
      text: "Back",
    },
  ];

  console.log(transactions);

  return (
    <main className="min-h-screen bg-[#f7f7f7] py-5 px-5 md:px-28">
      <header className="flex flex-wrap gap-5 items-center justify-between">
        <BreadcrumbComponent
          items={BreadCrumbItems}
          currentPage={account?.accountName as string}
        />
        <div className="flex md:items-center gap-2 font-medium tracking-wider">
          <span className="whitespace-nowrap">Account Owner:</span>
          <Link
            href={`/user/${account?.userId}`}
            className="capitalize font-light"
          >
            {account?.ownerName}
          </Link>
        </div>
      </header>
      <section className="mt-10 flex gap-3 max-sm:flex-col md:items-end justify-between border-b pb-6">
        {/* Left side */}
        <div className="space-y-3 font-medium tracking-wider">
          <p>
            <span>Account Number: </span>
            <span className="capitalize font-light">
              {account?.accountNumber}
            </span>
          </p>
          <p>
            <span>Account Type: </span>
            <span className="capitalize font-light">
              {account?.accountType}
            </span>
          </p>
          <p>
            <span>Created: </span>
            <span className="font-light">{account?.createdAt}</span>
          </p>
        </div>
        {/* Right side */}
        <div className="space-y-3 font-medium tracking-wider">
          <div className="flex max-sm:flex-col md:items-center justify-end gap-2 clear-both">
            <p>
              <span>Balance: </span>
              <span className="uppercase font-light">
                {account &&
                  account.currency &&
                  currencies[account?.currency as string].symbol}{" "}
                {""}
                {account?.balance}
              </span>
            </p>
          </div>
          <div className="flex items-center max-sm:justify-between gap-3">
            <Link
              href={`/admin/edit/account/${id}`}
              className="text-xs flex items-center gap-1"
            >
              <LucideEdit size={16} />
              Edit Info
            </Link>
            <Button
              size="sm"
              className="text-xs flex items-center gap-1"
              variant="destructive"
            >
              <Trash2 size={16} />
              Delete Account
            </Button>
          </div>
        </div>
      </section>
      <section>
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg my-5">Transactions</h2>
          <Link
            className="bg-primary p-3 md:p-2 rounded-md text-white text-sm tracking-wider font-light shadow flex items-center gap-1"
            href={`/admin/new/transaction/${account?.id}`}
          >
            <PlusCircle size={16} />
            Add New Transaction
          </Link>
        </div>
        <div>
          {transactions.length > 0 ? (
            <AdminTransactionCard transactions={transactions} />
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

export default UniqueAccountComponent;
