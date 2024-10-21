"use server";

import connectDB from "@/lib/db";
import { updatePasswordSchema } from "./schema";
import User from "@/model/user";
import { hashPassword } from "@/lib/hash";

export const updatePassword = async (form: FormData) => {
  try {
    const data = {
      password: form.get("password") as string,
      confirmPassword: form.get("confirmPassword") as string,
      userId: form.get("userId") as string,
    };

    const validation = updatePasswordSchema.safeParse(data);

    if (!validation.success) {
      return validation.error;
    }
    await connectDB();

    data.password = await hashPassword(data.password as string);

    const updatedUser = await User.findOneAndUpdate(
      { _id: data.userId },
      data,
      { returnOriginal: false }
    );

    if (updatedUser) {
      return { success: true, message: "Password updated successfully" };
    } else {
      return {
        success: false,
        message: "Failed to update password. Try again",
      };
    }
  } catch (error) {
    throw error;
  }
};
