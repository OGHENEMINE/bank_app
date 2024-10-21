"use server";
import connectDB from "@/lib/db";
import User from "@/model/user";
import { otpSchema } from "./schema";
import { sendOTP } from "@/lib/sendMail";

export const verifyOTP = async (form: FormData) => {
  try {
    const data = {
      pin: form.get("pin") as string,
      userId: form.get("userId") as string,
    };

    const validation = otpSchema.safeParse(data);

    if (!validation.success) {
      return validation.error;
    }

    await connectDB();

    const user = await User.findOne({ _id: data.userId });
    if (user) {
      if (user.otp === data.pin) {
        if (user.otpExpires <= new Date()) {
          return {
            success: false,
            message: "OTP has expired.",
            email: user.email,
            expired: true,
          };
        } else {
          return {
            success: true,
            message: "OTP verified successfully.",
            email: user.email,
            expired: false,
          };
        }
      } else {
        return {
          success: false,
          message: "Incorrect credential. Check Email.",
          email: user.email,
          expired: false,
        };
      }
    } else {
      return {
        success: false,
        message: "User not found.",
        email: "",
        expired: false,
      };
    }
  } catch (error) {
    throw error;
  }
};

export const resendOTPEmail = async (email: string) => {
  try {
    console.log("user email",email)
    const otp = Math.random().toString().substring(2).slice(0, 6);

    await connectDB();

    const registeredUser = await User.findOneAndUpdate(
      { email: email },
      { otp: otp, otpExpires: new Date(Date.now() + 600000) },
      { returnOriginal: false }
    );

    if (registeredUser) {
      const OTPRes = await sendOTP(
        registeredUser.email,
        otp,
        registeredUser.lastname
      );

      if (!OTPRes) {
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