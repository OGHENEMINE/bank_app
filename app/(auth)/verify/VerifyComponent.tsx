"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { regenerateLink, verifyUserEmail } from "./action";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface UserDetailInterface {
  userId: string;
  secret: string;
  expire: string;
}

const VerifyComponent = () => {
  const query = useSearchParams();
  const { push } = useRouter();
  const [userDetails, setUserDetails] = useState<UserDetailInterface>({
    userId: "",
    secret: "",
    expire: "",
  }); // Access the userId from the URL
  const [tokenExpired, setTokenExpired] = useState(false); // Check if token is expired

  useEffect(() => {
    setUserDetails({
      userId: query.get("userId")!,
      secret: query.get("secret")!,
      expire: query.get("expire")!,
    });
  }, [query]);

  const handleVerification = useCallback(async () => {
    try {
      const res = await verifyUserEmail(userDetails.userId, userDetails.expire);
      console.log(res);
      if (res?.success === true) {
        toast.success(res?.message);
        push("/login");
      } else {
        toast.error(res?.message);
        if (res?.message === "Token expired. Try again") {
          return setTokenExpired(!tokenExpired);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, [userDetails.userId, userDetails.expire, tokenExpired, push]);

  useEffect(() => {
    if (userDetails.userId && userDetails.expire && !tokenExpired) {
      handleVerification();
    }
  }, [userDetails.userId, userDetails.expire, tokenExpired, handleVerification]);

  const handleResendEmail = async (id: string) => {
    try {
      const res = await regenerateLink(userDetails.userId);
      if (res.success === true) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="space-y-3 text-center">
      <h1 className="text-lg font-bold mb-5">
        Email Verified Successfully! 🎉
      </h1>
      <p>Congratulations! Your email address has been successfully verified.</p>
      <p>
        You can now enjoy all the features and benefits of your new account. If
        you have any questions or need further assistance, feel free to reach
        out to our support team.
      </p>

      {tokenExpired && (
        <Button
          onClick={() => handleResendEmail(userDetails.userId)}
          className="tracking-widest"
        >
          Resend verification Link
        </Button>
      )}
    </div>
  );
};

export default VerifyComponent;
