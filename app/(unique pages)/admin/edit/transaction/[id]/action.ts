"use server";

import connectDB from "@/lib/db";
import { formatCurrencyDB } from "@/lib/formatCurrency";
import { formatDateString } from "@/lib/formatDate";
import Transaction from "@/model/transaction";
import { editTransactionSchema } from "./schema";

export const getTransactionInfo = async (id: string) => {
  try {
    await connectDB();

    if (!id) throw new Error("Account ID is required");

    const transaction = await Transaction.findById(id);
    if (transaction) {
      return {
        success: true,
        transaction: {
          id: transaction._id.toString(),
          accountId: transaction.transaction_accountId,
          transactionTitle: transaction.transaction_title,
          hiddenStatus: transaction.transaction_hidden_status,
          transactionStatus: transaction.transaction_status,
          transactionDesc: transaction.transaction_desc,
          amount: transaction.transaction_amount / 100,
          transactionType: transaction.transaction_type,
          transactionCurrency: transaction.transaction_currency,
          transactionReceiverName: transaction.transaction_receiver_name,
          transactionReceiverBank: transaction.transaction_receiver_bank,
          createdAt: formatDateString(transaction.createdAt.toString()),
        },
        message: "Transaction accessed successfully",
      };
    } else {
      return {
        success: false,
        transaction: {},
        message: "Transaction not found",
      };
    }
  } catch (error) {
    throw error;
  }
};
export const updateInfo = async (form: FormData) => {
  try {
    const data = {
      id: form.get("id") as string,
      transaction_amount: formatCurrencyDB(
        Number(form.get("transaction_amount"))
      ),
      transaction_status: form.get("transaction_status") as string,
      transaction_hidden_status: form.get("transaction_hidden_status"),
    };
    console.log(data);
    const validation = editTransactionSchema.safeParse(data);
    if (!validation.success) {
      return {
        success: false,
        message: "Failed to validate input",
        error: validation.error,
      };
    }
    await connectDB();

    const updateTransaction = await Transaction.findByIdAndUpdate(
      { _id: data.id },
      {
        $set: data,
      },
      {
        returnOriginal: false,
      }
    );

    if (updateTransaction) {
      return {
        success: true,
        message: "Transaction updated successfully",
      };
    } else {
      return {
        success: false,
        message: "Transaction update failed. Try again",
      };
    }
  } catch (error) {
    throw error;
  }
};
