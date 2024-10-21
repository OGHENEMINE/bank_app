"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Coins,
  DownloadCloud,
  FolderPlusIcon,
  MoreHorizontal,
} from "lucide-react";
import SearchInput from "@/components/me/SearchInput";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";
import { deleteWallet, getWallet } from "./action";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import ToolTipComponent from "@/components/me/ToolTipComponent";
import { CryptoAsset } from "@/Interface";

const WalletComponent = () => {
  const [wallets, setWallets] = useState<CryptoAsset[]>([]);
  const [userSearch, setUserSearcch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const { success, message, wallets } = await getWallet(userSearch);
        if (success) {
          return setWallets(wallets);
        } else {
          console.log("No users found");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [userSearch]);

  const handleDelete = async (id: string) => {
    try {
      const { success, message } = await deleteWallet(id);
      if (success) {
        const updatedWallets = wallets.filter((wallet) => wallet.id !== id);
        setWallets(updatedWallets);
        toast.success(message);
      } else {
        console.log("Failed to delete wallet");
        toast.error(message);
      }
    } catch (error) {
      console.log(error);
      // toast.error(error.message);
    }
  };

  const handlePageChange = (dir: string) => {
    if (dir === "prev") {
      page > 1 && setPage(page - 1);
    } else {
      page < totalPages! && setPage(page + 1);
    }
  };

  console.log(wallets);

  return (
    <section className="my-5 mx-5 space-y-4">
      <Card className="px-4 py-3">
        <CardHeader className="p-0">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <CardTitle className="text-lg max-sm:font-bold tracking-widest flex items-center gap-1">
              Wallets <Coins size={20} />({wallets.length})
            </CardTitle>
            <div className="flex flex-wrap items-center gap-2">
              <SearchInput
                search={userSearch}
                isLoading={isLoading}
                setSearch={setUserSearcch}
              />
              <Link
                href="/admin/new/wallet"
                className="px-3 shadow p-2 bg-accent text-primary font-semibold rounded text-sm tracking-wider flex items-center gap-2"
              >
                Add Wallet
                <FolderPlusIcon size={20} />
              </Link>
              <Button
                className="text-sm tracking-wider flex items-center gap-1"
                size="icon"
              >
                <DownloadCloud size={20} />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card className="px-5 py-3">
        {wallets.length > 0 ? (
          <CardContent className="p-0 divide-y">
            {wallets.map(({ id, image, name, address, symbol, createdAt }) => (
              <div
                key={id.toString()}
                className="flex max-sm:flex-col max-sm:space-y-2 md:items-center justify-between py-3"
              >
                <div className="flex max-sm:flex-col md:items-center gap-3">
                  <Image
                    src={image}
                    alt="crypto asset image"
                    width={40}
                    height={40}
                  />
                  <div className="tracking-wider max-sm:space-y-1">
                    <p className="font-medium capitalize">
                      {name} ({symbol})
                    </p>
                    <p className="text-sm text-gray-500">{address}</p>
                    <p className="text-sm">{createdAt}</p>
                  </div>
                </div>
                <Button onClick={() => handleDelete(id)}>Delete</Button>
              </div>
            ))}
          </CardContent>
        ) : (
          <p className="text-center tracking-wider text-gray-500">
            No wallet has been added
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

export default WalletComponent;
