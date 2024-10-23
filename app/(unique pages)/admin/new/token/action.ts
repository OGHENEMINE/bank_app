"use server";

import connectDB from "@/lib/db";
import { tokenValidation } from "./schema";
import Token from "@/model/token";
import User from "@/model/user";
import {
  generateAlphanumericToken,
  generateNumericToken,
} from "@/lib/generateToken";

export const getSystemData = async () => {
  try {
    await connectDB();

    const users = await User.find();

    console.log(users);
    const transformedusers = users.map((user) => ({
      id: user._id.toString(),
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      pin: user.pin,
      registered: user.createdAt,
      role: user.role,
      otp: user.otp,
      otpExpiresAt: user.otpExpires,
    }));

    if (users.length > 0) {
      return {
        success: true,
        message: "users found successfully",
        users: transformedusers,
      };
    } else {
      return {
        success: false,
        message: "users can not be accessed",
        users: [],
      };
    }
  } catch (error) {
    throw error;
  }
};

export const addToken = async (form: FormData) => {
  try {
    const data = {
      userId: form.get("userId") as string,
      length: form.get("length"),
      type: form.get("type") as string,
    };

    console.log(data);

    const validation = tokenValidation.safeParse(data);

    if (!validation.success) {
      console.log(validation.error);
      return {
        success: false,
        message: "Data validation failed",
        error: validation.error.flatten(),
      };
    }

    await connectDB();

    const user = await User.findById(data.userId);

    const tokenAlphanumeric = generateAlphanumericToken(Number(data.length));
    const tokenNumeric = generateNumericToken(Number(data.length));

    const refineData = {
      token_userId: data.userId,
      username: `${user.firstname} ${user.lastname}`,
      token: data.type === "numeric" ? tokenNumeric : tokenAlphanumeric,
      usage: 10,
    };

    const tokens = await Token.find();

    const isExisting = tokens.some(
      (token) => token.token_userId === data.userId
    );

    if (isExisting) {
      return {
        success: false,
        message:
          "Can not make new token entry for this account. Update token instead.",
      };
    }

    const newToken = await Token.create(refineData);

    if (!newToken) {
      return {
        success: false,
        message: "Something went wrong. Try again",
      };
    }

    return {
      success: true,
      message: "Token successfully added.",
    };
  } catch (error: unknown) {
    throw error;
  }
};
