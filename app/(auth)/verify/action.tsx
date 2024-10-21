"use server";

import connectDB from "@/lib/db";
import { sendVerifyEmailLink } from "@/lib/sendMail";
import User from "@/model/user";
import crypto from "crypto";

export const verifyUserEmail = async (id: string, expire: string) => {
  try {
    console.log("verify id:", id);
    if (id) {
      await connectDB();

      const user = await User.findOne({ _id: id });
      console.log(user);
      if (!user) {
        return { success: false, message: "Can not access user. Try again" };
      }

      if (new Date(expire) <= new Date()) {
        return { success: false, message: "Token expired. Try again" };
      }

      const updatedUser = await User.findByIdAndUpdate(
        id,
        { isVerified: true }, // Use $set to update only the isVerified field
        { new: true } // Optionally, return the updated document
      );

      if (updatedUser) {
        return {
          success: true,
          message: "Email verified successfully. Proceed to login.",
        };
      } else {
        return { success: false, message: "Failed to verify email. Try again" };
      }
    } else {
      return { success: false, message: "Invalid user ID." };
    }
  } catch (error) {
    throw error;
  }
};

export const regenerateLink = async (id: string) => {
  try {
    // Generate a secret token
    const secret = crypto.randomBytes(50).toString("hex");

    // Calculate the expiration time for the verification link
    const expiresAt = new Date(new Date().getTime() + 60 * 60 * 1000);

    //check if email already exists
    const user = await User.findOne({ _id: id });

    if (!user) {
      return { success: false, message: "Can not access user. Try again" };
    }

    // Generate the verification link
    const verificationLink = `${
      process.env.SITE_ORIGIN
    }/verify?userId=${user._id.toString()}&secret=${secret}&expire=${expiresAt.toISOString()}`;

    console.log(verificationLink);

    // Send the verification email
    const VerifyEmailRes = await sendVerifyEmailLink(
      user.email,
      verificationLink,
      user.username
    );

    if (VerifyEmailRes) {
      return {
        success: true,
        message: "Proceed to email to verify your account.",
      };
    } else {
      return {
        success: false,
        message: "Something went wrong. Try again",
      };
    }
  } catch (error) {
    throw error;
  }
};
