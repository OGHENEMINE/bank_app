"use server";

import connectDB from "@/lib/db";
import Account from "@/model/account";
import Transaction from "@/model/transaction";
import User from "@/model/user";

export const getSpecificUser = async (id: string) => {
  try {
    await connectDB();

    const user = await User.findById(id);
    if (user) {
      const user_accounts = await Account.find({ account_userId: user.id });

      console.log("user:", user, "accounts:", user_accounts);

      return {
        success: true,
        message: "User found",
        user: {
          id: user._id.toString(),
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          pin: user.pin,
          role: user.role,
          registered: user.createdAt.toString(),
        },
        accounts: user_accounts.map((account) => ({
          id: account._id.toString(),
          accountName: account.account_name,
          accountNumber: account.account_number,
          accountType: account.account_type,
          balance: account.balance,
          currency: account.currency,
          createdAt: account.createdAt.toString(),
        })),
      };
    } else {
      return {
        success: false,
        message: "User not found",
        user: {},
        accounts: [],
      };
    }
  } catch (error) {
    throw error;
  }
};

export const deleteUserData = async (id: string) => {
  try {
    await connectDB();

    const user = await User.findById(id);

    if (user) {
      // Find user accounts
      const userAccounts = await Account.find({
        account_userId: user._id,
      });

      // Find transactions for each account
      const userTransactions = await Promise.all(
        userAccounts.map(async (account) => {
          return await Transaction.find({ accountId: account._id });
        })
      );
      // Perform deletion of transactions, accounts, and user here
      await Promise.all(
        userTransactions.flat().map(async (transaction) => {
          await Transaction.deleteOne({ _id: transaction._id });
        })
      );

      await Promise.all(
        userAccounts.map(async (account) => {
          await Account.deleteOne({ _id: account._id });
        })
      );

      await User.deleteOne({ _id: user._id });
    }
  } catch (error) {
    throw error;
  }
};
