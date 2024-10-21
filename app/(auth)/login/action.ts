"use server";

import connectDB from "@/lib/db";
import * as jose from "jose";
import { loginSchema } from "./schema";
import User from "@/model/user";
import { compareHash } from "@/lib/hash";
import { createSession, verifySession } from "@/lib/session";
import { register } from "module";
import { formatDateString } from "@/lib/formatDate";

export const loginUser = async (form: FormData) => {
  try {
    const data = {
      email: form.get("email") as string,
      password: form.get("password") as string,
    };

    const validation = loginSchema.safeParse(data);

    if (!validation.success) {
      return {
        success: false,
        message: "Invalid credentials",
        error: validation.error.flatten()
      };
    }

    await connectDB();

    const registeredUser = await User.findOne({ email: data.email });

    if (registeredUser) {
      const isAMatch = await compareHash(
        data.password,
        registeredUser.password
      );

      if (!registeredUser.isVerified) {
        return {
          success: false,
          message:
            "Account not verified. Check your email to verify your account.",
        };
      }

      if (isAMatch) {
        console.log("User authenticated successfully!");
        const isLoggedIn = await createSession(registeredUser._id);
        if (isLoggedIn) {
          return { success: true, message: "Login successful" };
        } else {
          return { success: false, message: "Login failed. Try again." };
        }
      } else {
        return { success: false, message: "Login failed. Invalid credentials" };
      }
    } else {
      console.error("User email not found");
      return { success: false, message: "Invalid Credentials" };
    }
  } catch (error) {
    throw error;
  }
};

export const getLoggedInUser = async () => {
  try {
    await connectDB();
    const session = await verifySession();
    if (session) {
      const user = await User.findOne({ _id: session.userId });
      if (user) {
        return {
          id: user._id.toString(),
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          pin: user.pin,
          registered: user.createdAt,
          role: user.role,
          otp: user.otp,
          otpExpiresAt: user.otpExpires,
        };
      } else {
        return {
          success: false,
          message: "User not found",
        };
      }
    } else {
      return {
        success: false,
        message: "User not logged in",
      };
    }
  } catch (error) {
    console.error("Error fetching logged in user:", error);
    throw error;
  }
};
