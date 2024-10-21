"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DownloadCloud, MoreHorizontal, UserCheck } from "lucide-react";
import SearchInput from "@/components/me/SearchInput";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getSystemUsers } from "./actions";
import UserAvatar from "@/components/me/UserAvatar";
import Link from "next/link";
import { formatDateString } from "@/lib/formatDate";

import ToolTipComponent from "@/components/me/ToolTipComponent";
import { UserInterface } from "@/Interface";

const UsersComponent = () => {
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [userSearch, setUserSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const { users } = await getSystemUsers(userSearch, page);
        console.log(users);
        if (users) {
          return setUsers(users as UserInterface[]);
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
          <div className="flex max-sm:flex-col gap-2 md:items-center justify-between">
            <CardTitle className="text-lg tracking-widest max-sm:font-bold flex items-center gap-1">
              All Users <UserCheck size={20} />({users.length})
            </CardTitle>
            <div className="flex items-center gap-2 max-sm:w-full">
              <SearchInput
                search={userSearch}
                isLoading={isLoading}
                setSearch={setUserSearch}
              />
              <Button
                className="text-sm tracking-wider flex items-center gap-1"
                size="icon"
              >
                <DownloadCloud size={16} />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>
      <Card className="px-5 py-1">
        {users.length > 0 ? (
          <CardContent className="p-0 divide-y">
            {users.map(
              ({ id, email, firstname, lastname, registered, role }) => (
                <div
                  key={id.toString()}
                  className="flex items-start whitespace-nowrap justify-between py-3"
                >
                  <div className="flex max-sm:flex-col md:items-center gap-1 md:gap-3">
                    <UserAvatar
                      fallback={firstname.charAt(0) + lastname.charAt(0)}
                    />
                    <div className="tracking-wider">
                      <p className="font-medium capitalize">
                        {firstname} {lastname}
                      </p>
                      <p className="text-sm  text-gray-500">{email}</p>
                      <p>{formatDateString(registered as string)}</p>
                    </div>
                  </div>
                  <Link
                      className="text-sm text-end rounded transition-all duration-300 ease-in-out font-bold hover:underline"
                      href={`/user/${id}`}
                    >
                      See More
                    </Link>
                </div>
              )
            )}
          </CardContent>
        ) : (
          <p className="text-sm text-center tracking-wider text-gray-500">
            No registered user in the system
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

export default UsersComponent;
