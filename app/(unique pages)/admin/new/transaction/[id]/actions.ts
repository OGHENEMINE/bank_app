"use server";

import connectDB from "@/lib/db";
import { AdminTransactionValidation } from "./schema";
import { formatCurrencyDB, formatCurrencyUI } from "@/lib/formatCurrency";
import Account from "@/model/account";
import { sendTransactionEmail } from "@/lib/sendMail";
import currencies from "@/lib/currency";
import { formatDateString } from "@/lib/formatDate";
import Transaction from "@/model/transaction";

export const createTransaction = async (form: FormData) => {
  try {
    const data = {
      transaction_title: form.get("transaction_title") as string,
      transaction_desc: form.get("transaction_desc") as string,
      transaction_hidden_status: form.get("transaction_hidden_status"),
      transaction_amount: formatCurrencyDB(
        Number(form.get("transaction_amount"))
      ),
      transaction_type: form.get("transaction_type") as string,
      transaction_accountId: form.get("transaction_accountId") as string,
    };
    console.log("form data:", data);

    // Validate input data using Zod schema
    const validation = AdminTransactionValidation.safeParse(data);
    console.log("validation:", validation);

    if (!validation.success) {
      return {
        success: false,
        message: "Validation failed",
        error: validation.error,
      };
    }
    await connectDB();

    const transactionAccount = await Account.findById(
      data.transaction_accountId
    );

    console.log("Existing transaction account:", transactionAccount);

    if (!transactionAccount) {
      return {
        success: false,
        message: "Cannot perform transaction on a non-existent account",
      };
    }

    // Determine new balance based on transaction type
    let newBalance;

    if (data.transaction_type === "credit") {
      newBalance = transactionAccount.balance + data.transaction_amount;
    } else {
      if (transactionAccount.balance < data.transaction_amount) {
        return {
          success: false,
          message: "Insufficient balance for this transaction",
        };
      }
      newBalance = transactionAccount.balance - data.transaction_amount;
    }

    console.log("New balance after transaction:", newBalance);

    const refinedData = {
      ...data,
      transaction_status: "approved",
      transaction_currency: transactionAccount.currency,
      transaction_receiver_name: "same",
      transaction_receiver_bank: "same",
    };

    // Create the transaction first
    const newTransaction = await Transaction.create(refinedData);

    console.log("New transaction:", newTransaction);

    if (!newTransaction) {
      return {
        success: false,
        message: "Transaction failed. Try again",
      };
    }

    // If transaction is created, update the account balance
    const updatedAccount = await Account.findByIdAndUpdate(
      data.transaction_accountId,
      { balance: newBalance },
      { returnOriginal: false }
    );

    if (!updatedAccount) {
      // Rollback the transaction if account update fails
      await Transaction.findByIdAndDelete(newTransaction._id);
      return {
        success: false,
        message: "Failed to update account balance. Transaction rolled back.",
      };
    }

    const emailData = {
      accountNumber: transactionAccount.account_number.replace(
        /^(\d{5})\d+(..)/,
        "XXXXX$2XX"
      ),
      accountName: transactionAccount.account_name,
      transactionType: data.transaction_type,
      transactionAmount: formatCurrencyUI(
        data.transaction_amount,
        transactionAccount.currency
      ).toString(),
      createdAt: formatDateString(newTransaction.createdAt.toString()),
      availableBalance: formatCurrencyUI(
        newBalance,
        transactionAccount.currency
      ).toString(),
      transactionNarration: data.transaction_desc,
      trasansactionStatus: refinedData.transaction_status,
    };

    console.log("email data:", emailData);

    //send transaction notification email
    const emailRes = await sendTransactionEmail(
      emailData.accountNumber,
      emailData.transactionType,
      emailData.transactionAmount,
      emailData.createdAt,
      emailData.availableBalance,
      emailData.transactionNarration,
      emailData.trasansactionStatus
    );

    console.log("email response:", emailRes);

    if (emailRes.error) {
      // Rollback transaction if email fails
      await Transaction.findByIdAndDelete(newTransaction._id);
      await Account.findByIdAndUpdate(
        data.transaction_accountId,
        { balance: transactionAccount.balance },
        { returnOriginal: false }
      );

      return {
        success: false,
        message: "Failed to send transaction notification email",
      };
    }

    return {
      success: true,
      message: "Transaction created successfully",
    };
  } catch (error) {
    // // Improved error handling to return a more informative message
    return {
      success: false,
      message: "An error occurred while creating the transaction",
      error: error instanceof Error ? error.message : "Unknown error",
    };
    throw error;
  }
};
