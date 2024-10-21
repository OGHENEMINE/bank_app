"use server";

import User from "@/model/user";
import { recoverySchema } from "./schema";
import connectDB from "@/lib/db";
import { sendOTP } from "@/lib/sendMail";

export const sendOTPEmail = async (form: FormData) => {
  console.log(form);
  try {
    const otp = Math.random().toString().substring(2).slice(0, 6);

    const data = {
      email: form.get("email") as string,
    };

    const validation = recoverySchema.safeParse(data);

    if (!validation.success) {
      console.log(validation.error.formErrors);

      return validation.error;
    }

    await connectDB();

    const registeredUser = await User.findOneAndUpdate(
      { email: data.email },
      { otp: otp, otpExpires: new Date(Date.now() + 15 * 60 * 1000) },
      { returnOriginal: false }
    );

    if (!registeredUser) {
      return { success: false, message: "Invalid credential" };
    }

    if (!registeredUser.isVerified) {
      return {
        success: false,
        message:
          "Account not verified. Check your email to verify your account.",
      };
    }

    if (registeredUser) {
      const OTPMailRes = await sendOTP(
        registeredUser.email,
        otp,
        registeredUser.lastname
      );

      if (!OTPMailRes) {
        return {
          success: false,
          message: "Something went wrong. Try again",
          id: "",
        };
      } else {
        return {
          success: true,
          message: "Proceed to your email to continue.",
          id: registeredUser._id.toString(),
        };
      }
    } else {
      return {
        success: false,
        message: "Invalid credential. Please register.",
      };
    }
  } catch (error) {
    throw error;
  }
};
