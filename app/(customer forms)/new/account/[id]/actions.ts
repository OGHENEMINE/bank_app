"use server";

import connectDB from "@/lib/db";
import { newAccountSchema } from "./schema";
import Account from "@/model/account";
import generateAccountNumber from "@/lib/generateAccountNumber";

export const createNewCustomerAccount = async (form: FormData) => {
  try {
    const data = {
      userId: form.get("userId"),
      accountName: form.get("accountName"),
      accountType: form.get("accountType"),
      currency: form.get("currency"),
    };

    const validation = newAccountSchema.safeParse(data);

    console.log(validation.error);

    if (!validation.success) {
      return {
        success: false,
        error: validation.error,
        message: "invalid data",
      };
    }

    await connectDB();

    const newAccountNumber = generateAccountNumber();

    const refinedData = {
      account_type: data.accountType,
      account_name: data.accountName,
      account_userId: data.userId,
      currency: data.currency,
      account_number: newAccountNumber,
      balance: "0",
    };

    const newAccount = await Account.create(refinedData);

    if (newAccount) {
      return {
        success: true,
        message: "Account created successfully",
      };
    } else {
      return {
        success: false,
        message: "Something went wrong. Try again",
      };
    }
  } catch (error) {
    throw error;
  }
};
