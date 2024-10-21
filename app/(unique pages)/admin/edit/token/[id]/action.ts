"use server";

import connectDB from "@/lib/db";
import Token from "@/model/token";
import { editTokenSchema } from "./schema";

export const getTokenInfo = async (id: string) => {
  try {
    await connectDB();

    const token = await Token.findById(id);

    if (token) {
      return {
        success: true,
        message: "Token found successfully",
        token: {
          token: token.token,
          usage: token.usage.toString(),
        },
      };
    } else {
      return {
        success: false,
        message: "Token not found",
        token: {},
      };
    }
  } catch (error) {
    throw error;
  }
};

export const updateTokenInfo = async (form: FormData) => {
  try {
    const data = {
        id: form.get("id") as string,
        token: form.get("token") as string,
        usage: form.get("usage"),
      };
  
      console.log(data);
  
      const validation = editTokenSchema.safeParse(data);
  
      if (!validation.success) {
        return {
          success: false,
          message: "Failed to validate input",
          error: validation.error,
        };
      }
  
      await connectDB();

      console.log(data)
  
      const updatedUser = await Token.findByIdAndUpdate(
        data.id,
        {
          $set: {
            token: data.token,
            usage: Number(data.usage),
          },
        },
        { returnOriginal: false }
      );
  
      if (updatedUser) {
        return {
          success: true,
          message: "Token updated successfully",
        };
      } else {
        return {
          success: false,
          message: "Failed to update Token. Try again",
        };
      }
  } catch (error) {
    throw error;
  }
};
