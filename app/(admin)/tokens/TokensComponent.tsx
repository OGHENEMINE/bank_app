"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Coins,
  DownloadCloud,
  FolderPlusIcon,
  KeySquare,
  MoreHorizontal,
} from "lucide-react";
import SearchInput from "@/components/me/SearchInput";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import ToolTipComponent from "@/components/me/ToolTipComponent";
import { deleteToken, getTokens } from "./actions";
import { TokenInfo } from "@/Interface";

const TokensComponent = () => {
  const [tokens, setTokens] = useState<TokenInfo[]>([]);
  const [userSearch, setUserSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const fetchTokens = async () => {
      setIsLoading(true);
      try {
        const { success, message, tokens, total } = await getTokens(page);
        if (success) {
          console.log(tokens);
          console.info(message);
          setTotalPages(total);
          return setTokens(tokens);
        } else {
          console.error(message);
        }
      } catch (error) {
        console.error("Error fetching tokens:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTokens();
  }, [userSearch, page]);

  const handleDelete = async (id: string) => {
    try {
      const { success, message } = await deleteToken(id);
      if (success) {
        const updateTokens = tokens.filter((token) => token.id !== id);
        setTokens(updateTokens);
        toast.success(message);
      } else {
        console.log("Failed to delete token");
        toast.error(message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

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
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg tracking-widest flex items-center gap-1">
              User Token <KeySquare size={20} />({tokens.length})
            </CardTitle>
            <div className="flex items-center gap-2">
              <SearchInput
                search={userSearch}
                isLoading={isLoading}
                setSearch={setUserSearch}
              />
              <Link
                href="/admin/new/token"
                className="px-3 shadow p-2 bg-accent text-primary font-semibold rounded text-sm tracking-wider flex items-center gap-2"
              >
                Add Token
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

      <Card className="px-5 py-2">
        {tokens.length > 0 ? (
          <CardContent className="p-0 divide-y">
            {tokens.map(({ id, username, token, usage, createdAt }) => (
              <div
                key={id}
                className="flex text-sm capitalize  items-center justify-between"
              >
                <div className="tracking-widest">
                  <p className="text-lg font-bold ">{token}</p>
                  <p>{username}</p>
                  <p className="font-medium text-gray-500">{usage}</p>
                </div>
                <div className="flex flex-col items-end">
                  <ToolTipComponent hoverText="Options">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        asChild
                        className="outline-none relative"
                      >
                        <MoreHorizontal size={20} />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="absolute -right-8">
                        <DropdownMenuItem onClick={() => handleDelete(id)}>
                          Delete
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link href={`/admin/edit/token/${id}`}>Update</Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </ToolTipComponent>
                  <p className="text-sm">{createdAt}</p>
                </div>
              </div>
            ))}
          </CardContent>
        ) : (
          <p className="text-center tracking-wider text-gray-500">
            No token has been added
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

export default TokensComponent;
