import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AuthContext } from "@/context/authContext";
import { AuthContextInterface } from "@/Interface";
import React, { useContext } from "react";

const UserAvatar = ({ fallback }: { fallback?: string }) => {
  const { user } = useContext(AuthContext) as AuthContextInterface;

  //user avatar initials
  const userInitials = user.firstname.charAt(0) + user.lastname.charAt(0);
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback className="uppercase max-sm:font-bold">{fallback || userInitials}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
