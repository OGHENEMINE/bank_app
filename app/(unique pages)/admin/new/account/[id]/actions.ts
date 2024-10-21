"use server";
import connectDB from "@/lib/db";
import { formatCurrencyDB } from "@/lib/formatCurrency";
import generateAccountNumber from "@/lib/generateAccountNumber";
import Account from "@/model/account";
import User from "@/model/user";
import { AccountValidation } from "./schema";

export const getspecificUser = async (id: string) => {
  try {
    await connectDB();

    const user = await User.findById(id);
    if (user) {
      return {
        success: true,
        message: "User found successfully",
        user: {
          id: user._id.toString(),
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          pin: user.pin,
          role: user.role,
          registered: user.createdAt,
        },
      };
    } else {
      return {
        success: false,
        message: "User not found",
        user: null,
      };
    }
  } catch (error) {
    throw error;
  }
};

export const createBankAccount = async (form: FormData) => {
  try {
    const newAccountNumber = generateAccountNumber();

    const data = {
      account_userId: form.get("account_userId") as string,
      account_name: form.get("account_name") as string,
      account_type: form.get("account_type") as string, // Log this to check
      account_number: newAccountNumber,
      balance: formatCurrencyDB(Number(form.get("balance"))),
      currency: form.get("currency") as string,
    };

    console.log(data);

    const validation = AccountValidation.safeParse(data);

    if (!validation.success) {
      return {
        success: false,
        message: "Failed to validate input",
        error: validation.error,
      };
    }

    await connectDB();

    const newAccount = await Account.create(data);

    console.log("New Account Saved:", newAccount);

    if (newAccount) {
      return {
        success: true,
        message: "Account created successfully",
      };
    } else {
      return {
        success: false,
        message: "Failed to create account. Try again",
      };
    }
  } catch (error) {
    console.error("Error in createBankAccount:", error);
    throw error;
  }
};
