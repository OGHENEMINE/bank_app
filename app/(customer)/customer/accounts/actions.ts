"use server";
import connectDB from "@/lib/db";
import { formatCurrencyUI } from "@/lib/formatCurrency";
import { formatDateString } from "@/lib/formatDate";
import Account from "@/model/account";

export const getUserAccounts = async (id: string) => {
  try {
    if (!id) {
      throw new Error("Account not found");
    }

    await connectDB();

    const accounts = await Account.find({ account_userId: id });

    console.log(accounts);
    const transformedAccounts = accounts.map((account) => ({
      id: account._id.toString(),
      userId: account.account_userId,
      accountNumber: account.account_number,
      accountName: account.account_name,
      accountType: account.account_type,
      balance: account.balance,
      currency: account.currency,
      createdAt: formatDateString(account.createdAt),
    }));

    if (accounts.length > 0) {
      return { success: true, accounts: transformedAccounts, message: "" };
    } else {
      return { success: false, message: "No account found", accounts: [] };
    }
  } catch (error) {
    throw error;
    console.log(error);
  }
};
