"use server";

import connectDB from "@/lib/db";
import { formatDateString } from "@/lib/formatDate";
import Transaction from "@/model/transaction";

export const getBankTransactions = async (search: string, page: number) => {
  try {
    await connectDB();

    let transactions;
    const limit = 4;

    const totalPages = Math.ceil((await Transaction.countDocuments()) / limit);

    if (search !== "") {
      transactions = await Transaction.find({
        $or: [
          {
            transaction_title: {
              $regex: search,
              $options: "i",
            },
          },
          {
            transaction_status: {
              $regex: search,
              $options: "i",
            },
          },
        ],
      })
        .skip(page - 1)
        .limit(limit);
    } else {
      transactions = await Transaction.find()
        .skip((page - 1) * limit)
        .limit(limit);
    }

    if (transactions.length > 0) {
      return {
        success: true,
        message: "Transactions found successfully",
        total: totalPages,
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
      };
    } else {
      return {
        success: false,
        message: "No transactions found",
        total: totalPages,
        transactions: [],
      };
    }
  } catch (error) {
    throw error;
  }
};
