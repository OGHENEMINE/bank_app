"use server";

import connectDB from "@/lib/db";
import { formatCurrencyUI } from "@/lib/formatCurrency";
import { formatDateString } from "@/lib/formatDate";
import Account from "@/model/account";
import Transaction from "@/model/transaction";
import User from "@/model/user";

export const getSpecificAccount = async (id: string) => {
  try {
    await connectDB();

    const account = await Account.findById(id);
    console.log(account);
    const transactions = await Transaction.find({
      transaction_accountId: account?._id.toString(),
    });
    const accountOwner = await User.findById(account.account_userId);

    if (account) {
      return {
        success: true,
        message: "Account found successfully",
        account: {
          id: account._id.toString(),
          accountNumber: account.account_number,
          accountName: account.account_name,
          balance: account.balance,
          ownerName: `${accountOwner?.firstname} ${accountOwner?.lastname}`,
          currency: account.currency,
          accountType: account.account_type,
          userId: account.account_userId,
          createdAt: formatDateString(account.createdAt.toString()),
        },
        transactions: transactions.map((transaction) => ({
          id: transaction._id.toString(),
          transaction_accountId: transaction.transaction_accountId,
          transactionTitle: transaction.transaction_title,
          hiddenStatus: transaction.hidden_status,
          transactionStatus: transaction.transaction_status,
          transactionDesc: transaction.transaction_desc,
          amount: transaction.transaction_amount,
          transactionType: transaction.transaction_type,
          transactionCurrency: transaction.transaction_currency,
          transactionReceiver: transaction.transaction_receiver_name,
          transactionReceiverBank: transaction.transaction_receiver_bank,
          createdAt: formatDateString(transaction.createdAt.toString()),
        })),
      };
    } else {
      return {
        success: false,
        message: "Account not found",
        account: {},
        transactions: [],
      };
    }
  } catch (error) {
    throw error;
  }
};
