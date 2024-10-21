"use server";

import connectDB from "@/lib/db";
import User from "@/model/user";

export const getSystemUsers = async (search: string, page: number) => {
  try {
    await connectDB();
    console.log(search);

    let users;
    const limit = 4;

    const totalPages = Math.ceil((await User.countDocuments()) / limit);

    if (search !== "") {
      users = await User.find({
        $or: [
          {
            firstname: {
              $regex: search,
              $options: "i",
            },
          },
          {
            lastname: {
              $regex: search,
              $options: "i",
            },
          },
        ],
      })
        .skip(page - 1)
        .limit(limit);
    } else {
      users = await User.find()
        .skip(page - 1)
        .limit(limit);
    }

    if (users.length > 0) {
      return {
        success: true,
        message: "Users found",
        users: users.map((user) => ({
          id: user._id.toString(),
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          pin: user.pin,
          registered: user.createdAt,
          role: user.role,
          otp: user.otp,
          otpExpiresAt: user.otpExpires,
        })),
      };
    } else {
      return {
        success: false,
        message: "No user has been registered",
        users: [],
      };
    }
  } catch (error) {
    console.error("Error accessing users:", error); // Log the error for debugging purposes
    return {
      success: false,
      message: "An error occurred while accessing users",
    };
  }
};
