"use server";

import connectDB from "@/lib/db";
import { formatCurrencyUI } from "@/lib/formatCurrency";
import { formatDateString } from "@/lib/formatDate";
import Account from "@/model/account";
import Transaction from "@/model/transaction";
import User from "@/model/user";

export const getUserTransactions = async (id: string) => {
  try {
    await connectDB();

    if (!id) throw new Error("User ID is required");

    const user = await User.findById(id);
    console.log(user);

    if (!user) {
      return {
        success: false,
        message: "User not found",
        transactions: [],
      };
    }

    const accounts = await Account.find({ account_userId: user._id });

    // Fetch transactions for all accounts concurrently
    const userTransactions = await Promise.all(
      accounts.map((account) =>
        Transaction.find({ transaction_accountId: account._id }).sort({
          createdAt: "desc",
        })
      )
    );

    if (userTransactions.flat().length > 0) {
      return {
        success: true,
        message: "Transactions found successfully",
        transactions: userTransactions.flat().map((transaction) => ({
          id: transaction._id.toString(),
          accountId: transaction.transaction_accountId,
          transactionTitle: transaction.transaction_title,
          hiddenStatus: transaction.transaction_hidden_status,
          transactionStatus: transaction.transaction_status,
          transactionDesc: transaction.transaction_desc,
          amount: transaction.transaction_amount,
          transactionType: transaction.transaction_type,
          transactionCurrency: transaction.transaction_currency,
          transactionReceiverName: transaction.transaction_receiver_name,
          transactionReceiverBank: transaction.transaction_receiver_bank,
          createdAt: formatDateString(transaction.createdAt.toString()),
        })),
      };
    } else {
      return {
        success: false,
        message: "No transactions found",
        transactions: [],
      };
    }
  } catch (error) {
    console.error(error); // Log error for debugging
    throw error;
  }
};
