"use server";

import connectDB from "@/lib/db";
import { formatCurrencyUI } from "@/lib/formatCurrency";
import { formatDateString } from "@/lib/formatDate";
import Account from "@/model/account";
import Transaction from "@/model/transaction";
import User from "@/model/user";
import { format } from "path";

export const getSystemData = async () => {
  try {
    await connectDB();
    const users = await User.find();
    const pendingTransactions = await Transaction.find({
      transaction_status: "pending",
    });

    if (users.length > 0) {
      return {
        success: true,
        message: "Users accessed successfully",
        users: users.map((user) => ({
          id: user._id.toString(),
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          pin: user.pin,
          registered: user.createdAt,
          role: user.role,
        })),
        transactions: pendingTransactions.map((transaction) => ({
          id: transaction._id.toString(),
          account_id: transaction.transaction_accountId,
          transactionTitle: transaction.transaction_title,
          hiddenStatus: transaction.transaction_hidden_status,
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
        message: "No user has been registered",
        users: [],
        transactions: [],
      };
    }
  } catch (error) {
    throw error;
  }
};

export const getSpecificUserAccount = async (id: string) => {
  try {
    await connectDB();

    // console.log(id);

    const account = await Account.findOne({ account_userId: id });

    if (account) {
      const transactions = await Transaction.find({
        transaction_accountId: account?._id,
      })
        .sort({ createdAt: "desc" })
        .limit(5);
      console.log(typeof account.balance);
      const accountOwner = await User.findById(id);
      return {
        success: true,
        message: "Accounts accessed successfully",
        transactions: transactions.map((transaction) => ({
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
      };
    } else {
      return {
        success: false,
        message: "No bank account found for this user",
        transactions: [],
        accounts: [],
      };
    }
  } catch (error) {
    throw error;
  }
};
