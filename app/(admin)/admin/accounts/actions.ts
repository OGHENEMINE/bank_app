"use server";

import connectDB from "@/lib/db";
import { formatCurrencyUI } from "@/lib/formatCurrency";
import { formatDateString } from "@/lib/formatDate";
import Account from "@/model/account";

export const getBankAccounts = async (search: string, page: number) => {
  try {
    await connectDB();

    let accounts;
    const limit = 4;

    const totalPages = Math.ceil((await Account.countDocuments()) / limit);

    if (search !== "") {
      accounts = await Account.find({
        $or: [
          {
            account_name: {
              $regex: search,
              $options: "i",
            },
          },
          {
            currency: {
              $regex: search,
              $options: "i",
            },
          },
          {
            account_number: {
              $regex: search,
              $options: "i",
            },
          },
        ],
      })
        .skip(page - 1)
        .limit(limit);
    } else {
      accounts = await Account.find()
        .skip(page - 1)
        .limit(limit);
    }

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
      return {
        success: true,
        total: totalPages,
        message: "Accounts found successfully",
        accounts: transformedAccounts,
      };
    } else {
      return {
        success: false,
        total: totalPages,
        message: "Accounts can not be accessed",
        accounts: [],
      };
    }
  } catch (error) {
    throw error;
  }
};
