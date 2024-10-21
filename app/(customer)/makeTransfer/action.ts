"use server";

import connectDB from "@/lib/db";
import { formatCurrencyDB, formatCurrencyUI } from "@/lib/formatCurrency";
import { formatDateString } from "@/lib/formatDate";
import Account from "@/model/account";
import Transaction from "@/model/transaction";
import { connect } from "http2";

export const getUserAccounts = async (id: string) => {
  try {
    if (!id) {
      throw new Error("Invalid account ID");
    }

    await connectDB();
    const accounts = await Account.find({ account_userId: id });

    if (accounts) {
      return {
        success: true,
        message: "User accounts fetched successfully",
        accounts: accounts.map((account) => ({
          id: account._id.toString(),
          userId: account.account_userId,
          accountNumber: account.account_number,
          accountName: account.account_name,
          accountType: account.account_type,
          balance: formatCurrencyUI(account.balance, account.currency),
          currency: account.currency,
          createdAt: formatDateString(account.createdAt),
        })),
      };
    } else {
      return {
        success: false,
        message: "No accounts found for this user",
        accounts: [],
      };
    }
  } catch (error) {
    throw error;
  }
};

export const makeTransfer = async (data: {
  account: string;
  amount: string;
  transactionDescription: string;
  receiverBank: string;
  transactionReceiver: string;
}) => {
  try {
    await connectDB();

    // Find the transfer account
    const transferAccount = await Account.findById(data.account);
    // return console.log(transferAccount)
    if (!transferAccount) throw new Error("Transfer account does not exist");

    let receiverName = data.transactionReceiver;
    let receiverBank = data.receiverBank;

    // If transferring to the same bank, validate the receiver account
    if (data.receiverBank === "same") {
      const receiverAccount = await Account.findOne({
        account_number: data.transactionReceiver,
      });
      if (!receiverAccount) throw new Error("Receiver account not found");

      receiverName = receiverAccount.account_name;
      receiverBank = "same";
    }

    // Create the transaction (debit)
    const newTransaction = await Transaction.create({
      transaction_accountId: data.account,
      transaction_title: "Transfer",
      transaction_hidden_status: false,
      transaction_status: "pending",
      transaction_desc: data.transactionDescription,
      transaction_amount: formatCurrencyDB(Number(data.amount)),
      transaction_type: "debit",
      transaction_currency: transferAccount.currency,
      transaction_receiver_name: receiverName,
      transaction_receiver_bank: receiverBank,
    });

    if (newTransaction) {
      return {
        success: true,
        message: "Transfer successful",
      };
    } else {
      return {
        success: false,
        message: "Transfer failed",
      };
    }
  } catch (error) {
    throw error;
  }
};
