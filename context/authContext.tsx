"use client";
import { getLoggedInUser } from "@/app/(auth)/login/action";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";
import { getLoggedOut } from "./action";
import { formatDateString } from "@/lib/formatDate";
import { AuthContextInterface, UserInterface } from "@/Interface";

export const AuthContext = createContext<AuthContextInterface | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { push } = useRouter();
  const [user, setUser] = useState<UserInterface>({
    id: "",
    firstname: "",
    lastname: "",
    email: "",
    pin: "",
    registered: "",
    role: "",
    otp: "",
    otpExpiresAt: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkUser = async () => {
    setIsLoading(true);
    try {
      const loggedInUser = await getLoggedInUser(); // Make sure this function is defined and works correctly
      console.log("current user", loggedInUser);
      if (loggedInUser && loggedInUser.success !== false) {
        // console.log(loggedInUser)
        setUser({
          id: loggedInUser.id,
          firstname: loggedInUser.firstname,
          lastname: loggedInUser.lastname,
          email: loggedInUser.email,
          pin: loggedInUser.pin,
          registered: formatDateString(loggedInUser.registered),
          role: loggedInUser.role,
          otp: loggedInUser.otp,
          otpExpiresAt: loggedInUser.otpExpiresAt,
        });
        setIsAuthenticated(true);
      } else {
        setUser(user); // Clear user state if no user is found
        setIsAuthenticated(false);
        console.error("User not found");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const handleLogOut = async () => {
    try {
      await getLoggedOut();
      checkUser();
      toast.info("Account has been logged out");
    } catch (error) {
      console.log("Unexpected error occured while logging out", error);
    }
  };

  const values = {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    checkUser,
    handleLogOut,
    isLoading
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
