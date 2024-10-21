"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DownloadCloud, KeySquare, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import UserAvatar from "@/components/me/UserAvatar";
import Link from "next/link";
import SearchInput from "@/components/me/SearchInput";
import { getBankAccounts } from "./actions";
import { toast } from "sonner";
import currencies from "@/lib/currency";
import ToolTipComponent from "@/components/me/ToolTipComponent";
import { AccountInterface } from "@/Interface";

const AccountComponent = () => {
  const [accounts, setAccounts] = useState<AccountInterface[]>([]);
  const [userSearch, setUserSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const fetchAccounts = async () => {
      setIsLoading(true);
      try {
        const { success, accounts, message } = await getBankAccounts(
          userSearch,
          page
        );
        if (success) {
          setAccounts(accounts as AccountInterface[]);
        } else {
          // toast.error(message);
          setAccounts(accounts);
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
    <section className="mt-5 mx-5 space-y-4">
      <Card className="px-4 py-3">
        <CardHeader className="p-0">
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <CardTitle className="text-lg tracking-widest max-sm:font-bold flex items-center gap-1">
              All Accounts <KeySquare size={18} /> ({accounts.length})
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
                <DownloadCloud size={16} />
              </Button> */}
            </div>
          </div>
        </CardHeader>
      </Card>
      <Card className="px-4 py-2">
        {accounts.length > 0 ? (
          <CardContent className="p-0 divide-y">
            {accounts.map(
              ({ id, accountName, accountNumber, balance, currency }) => (
                <div
                  key={id.toString()}
                  className="flex flex-wrap items-center justify-between tracking-wider gap-1 p-3"
                >
                  <div className="md:space-y-1">
                    <p className="font-medium capitalize">
                      Account Name: {accountName}
                    </p>
                    <p className="text-sm  text-gray-500">
                      Account Number: {accountNumber}
                    </p>
                  </div>
                  <div className="text-sm space-y-2 md:space-y-1">
                    <p className="font-bold">{currency}</p>
                    <Link
                      className="rounded inline-block transition-all duration-300 ease-in-out font-semibold hover:underline"
                      href={`/account/${id.toString()}`}
                    >
                      See More
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

export default AccountComponent;
