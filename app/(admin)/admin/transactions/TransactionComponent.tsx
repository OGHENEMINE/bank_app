"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import {
  ArrowLeftRight,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  DownloadCloud,
  MoreHorizontal,
} from "lucide-react";
import SearchInput from "@/components/me/SearchInput";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatCurrencyUI } from "@/lib/formatCurrency";
import { TransactionInterface } from "@/Interface";
import { getBankTransactions } from "./actions";
import Link from "next/link";

const TransactionComponent = () => {
  const [transactions, setTransactions] = useState<TransactionInterface[]>([]);
  const [userSearch, setUserSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const fetchAccounts = async () => {
      setIsLoading(true);
      try {
        const { success, transactions, total, message } =
          await getBankTransactions(userSearch, page);
        if (success) {
          setTransactions(transactions as TransactionInterface[]);
          setTotalPages(total);
        } else {
          // toast.error(message);
          setTransactions(transactions);
          setTotalPages(total);
        }
      } catch (error) {
        console.error("Error fetching accounts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccounts();
  }, [userSearch, page]);

  console.log(userSearch);

  const handlePageChange = (dir: string) => {
    if (dir === "prev") {
      page > 1 && setPage(page - 1);
    } else {
      page < totalPages! && setPage(page + 1);
    }
  };

  return (
    <section className="my-5 mx-5 space-y-4">
      <Card className="px-4 py-3">
        <CardHeader className="p-0">
          <div className="flex flex-wrap items-center justify-between gap-2 ">
            <CardTitle className="text-lg tracking-widest flex items-center max-sm:font-bold gap-1">
              All Transactions <ArrowLeftRight size={20} /> (
              {transactions.length})
            </CardTitle>
            <div className="flex items-center gap-2 max-sm:w-full">
              <SearchInput
                isLoading={isLoading}
                search={userSearch}
                setSearch={setUserSearch}
              />
              {/* <Button
                className="text-sm tracking-wider flex items-center gap-1"
                size="icon"
              >
                <DownloadCloud size={20} />
              </Button> */}
            </div>
          </div>
        </CardHeader>
      </Card>
      <Card className="px-4 py-3">
        {transactions.length > 0 ? (
          <CardContent className="p-0 divide-y">
            {transactions.map(
              ({
                id,
                transactionCurrency,
                createdAt,
                amount,
                transactionTitle,
                transactionStatus,
                transactionDesc,
                transactionType,
              }) => (
                <div
                  key={id}
                  className="flex items-center justify-between first:pt-0 last:pb-0 py-3"
                >
                  <div className="tracking-wider">
                    <span
                      className={`text-sm capitalize px-1.5 py-0.5 text-white rounded-sm ${
                        transactionStatus === "approved"
                          ? "bg-green-600"
                          : transactionStatus === "pending"
                          ? "bg-yellow-400"
                          : "bg-red-500"
                      }`}
                    >
                      {transactionStatus}
                    </span>
                    <p className="font-medium capitalize">{transactionTitle}</p>

                    <p className="text-sm  text-gray-500">{createdAt}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <p
                      className={`font-bold ${
                        transactionStatus === "approved"
                          ? "text-green-600"
                          : transactionStatus === "pending"
                          ? "text-yellow-400"
                          : "text-red-500"
                      }`}
                    >
                      {formatCurrencyUI(amount, transactionCurrency)}
                    </p>

                    <Link
                      className="hover:underline p-1.5 inline-block text-sm font-medium max-sm:font-bold tracking-wider transition-all duration-300 ease-in-out"
                      href={`/admin/edit/transaction/${id}`}
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              )
            )}
          </CardContent>
        ) : (
          <p className="text-sm text-center tracking-wider text-gray-500">
            No registered account in the system
          </p>
        )}
      </Card>

      {totalPages > 1 && (
        <div className="flex items-center gap-5">
          <Button
            disabled={page === 1}
            onClick={() => handlePageChange("prev")}
          >
            Prev
          </Button>
          <Button
            disabled={page === totalPages}
            onClick={() => handlePageChange("next")}
          >
            Next
          </Button>
        </div>
      )}
    </section>
  );
};

export default TransactionComponent;
