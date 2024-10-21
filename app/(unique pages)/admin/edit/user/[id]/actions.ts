"use server";

import connectDB from "@/lib/db";
import { formatDateString } from "@/lib/formatDate";
import User from "@/model/user";
import { connect } from "http2";
import { editUserSchema } from "./schema";

export const getSpecificUser = async (id: string) => {
  try {
    await connectDB();

    const user = await User.findById(id);

    console.log(id);

    if (user) {
      return {
        success: true,
        message: "User found successfully",
        user: {
          id: user._id.toString(),
          firstname:
            user.firstname.charAt(0).toUpperCase() +
            user.firstname.slice(1),
          lastname:
            user.lastname.charAt(0).toUpperCase() +
            user.lastname.slice(1),
          email: user.email,
          pin: user.pin,
          role: user.role,
          registered: formatDateString(user.createdAt.toString()),
        },
      };
    } else {
      return {
        success: false,
        message: "User can not be accessed",
        user: {},
      };
    }
  } catch (error) {
    throw error;
  }
};

export const editUserInfo = async (form: FormData) => {
  try {
    const data = {
      userId: form.get("userId") as string,
      firstname: form.get("firstname") as string,
      lastname: form.get("lastname") as string,
      email: form.get("email") as string,
      role: form.get("role") as string,
      pin: form.get("pin") as string,
    };

    console.log(data);

    const validation = editUserSchema.safeParse(data);

    if (!validation.success) {
      return {
        success: false,
        message: "Failed to validate input",
        error: validation.error,
      };
    }

    await connectDB();

    const updatedUser = await User.findByIdAndUpdate(
      data.userId,
      {
        $set: {
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          pin: data.pin,
          // password: data.password,
          role: data.role,
        },
      },
      { returnOriginal: false }
    );

    if (updatedUser) {
      return {
        success: true,
        message: "User updated successfully",
      };
    } else {
      return {
        success: false,
        message: "Failed to update user. Try again",
      };
    }
  } catch (error) {
    throw error;
  }
};
