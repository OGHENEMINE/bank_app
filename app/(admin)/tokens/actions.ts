"use server";

import connectDB from "@/lib/db";
import { formatDateString } from "@/lib/formatDate";
import Token from "@/model/token";
import User from "@/model/user";

export const getTokens = async (page: number) => {
  try {
    await connectDB();

    const limit = 4;
    const totalPages = Math.ceil((await User.countDocuments()) / limit);

    const tokens = await Token.find()
      .skip((page - 1) * limit)
      .limit(limit);

    if (tokens.length > 0) {
      return {
        success: true,
        total: totalPages,
        message: "Tokens fetched successfully",
        tokens: tokens.map((token) => ({
          id: token._id.toString(),
          token: token.token,
          username: token.username,
          usage: token.usage,
          createdAt: formatDateString(token.createdAt.toString()),
        })),
      };
    } else {
      return {
        success: false,
        total: totalPages,
        message: "Tokens can not be accessed",
        tokens: [],
      };
    }
  } catch (error) {
    throw error;
  }
};

export const deleteToken = async (id: string) => {
  try {
    await connectDB();

    const deleteToken = await Token.findByIdAndDelete(id);

    if (deleteToken) {
      return {
        success: true,
        message: "Token deleted successfully",
      };
    } else {
      return {
        success: false,
        message: "Delete failed. Try again",
      };
    }
  } catch (error) {
    throw error;
  }
};
