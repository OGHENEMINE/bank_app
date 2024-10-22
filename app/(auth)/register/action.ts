"use server";

import { hashPassword } from "@/lib/hash";
import crypto from "crypto";
import User from "@/model/user";
import { userSchema } from "./schema";
import connectDB from "@/lib/db";
import { sendVerifyEmailLink } from "@/lib/sendMail";

export const createAccount = async (form: FormData) => {
  try {
    console.log(form);
    const data = {
      firstname: form.get("firstname") as string,
      lastname: form.get("lastname") as string,
      password: form.get("password") as string,
      email: form.get("email") as string,
      pin: form.get("pin") as string,
    };

    const validation = userSchema.safeParse({
      ...data,
      confirmPassword: form.get("confirmPassword"),
    });

    if (!validation.success) {
      return {
        success: false,
        message: `something went wrong. ${validation.error.flatten()}`,
      };
    }

    data.password = await hashPassword(data.password as string);
    data.firstname = data.firstname.toLowerCase();
    data.lastname = data.lastname.toLowerCase();

    await connectDB();

    // Generate a secret token
    const secret = crypto.randomBytes(50).toString("hex");

    // Calculate the expiration time for the verification link
    const expiresAt = new Date(new Date().getTime() + 60 * 60 * 1000);

    //check if email already exists
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return {
        success: false,
        message: "Email already exists. Please use a different email address.",
      };
    }

    // Create the user in the database
    const user = await User.create({
      ...data,
      otp: "",
    });

    if (user) {
      // Generate the verification link
      const verificationLink = `${
        process.env.SITE_ORIGIN
      }/verify?userId=${user._id.toString()}&secret=${secret}&expire=${expiresAt.toISOString()}`;

      console.log(verificationLink);

      // Send the verification email
      const VerifyEmailRes = await sendVerifyEmailLink(
        user.email,
        verificationLink,
        user.lastname
      );

      if (VerifyEmailRes) {
        return {
          success: true,
          message:
            "Registration successful. Please check your email to verify your account.",
        };
      } else {
        // Optionally, you could delete the user if email sending fails
        await User.findByIdAndDelete(user._id);
        return {
          success: false,
          message: "Something went wrong. Try again",
        };
      }
    } else {
      return {
        success: false,
        message: "User creation failed. Please try again.",
      };
    }
  } catch (error) {
    throw error;
  }
};
