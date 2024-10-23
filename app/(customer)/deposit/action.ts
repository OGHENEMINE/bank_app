"use server";

import connectDB from "@/lib/db";
import { formatCurrencyDB, formatCurrencyUI } from "@/lib/formatCurrency";
import Account from "@/model/account";
import Wallet from "@/model/wallet";
import Transaction from "@/model/transaction";
import { sendTransactionEmail } from "@/lib/sendMail";
import { formatDateString } from "@/lib/formatDate";

export const getDepositData = async (id: string) => {
  try {
    await connectDB();

    const wallets = await Wallet.find();
    const accounts = await Account.find({ account_userId: id });
    console.log(accounts);
    if (wallets.length > 0) {
      return {
        success: true,
        message: "Deposit data accessed successfully",
        wallets: wallets.map((wallet) => ({
          id: wallet._id.toString(),
          symbol: wallet.symbol,
          address: wallet.wallet_address,
          image: wallet.image,
          name: wallet.crypto_asset,
          price: wallet.price,
          createdAt: wallet.createdAt,
        })),
        accounts: accounts.map((account) => ({
          id: account._id.toString(),
          userId: account.account_userId,
          accountNumber: account.account_number,
          accountName: account.account_name,
          accountType: account.account_type,
          balance: account.balance,
          currency: account.currency,
          createdAt: account.createdAt,
        })),
      };
    } else {
      return {
        success: false,
        message: "Deposit data can not be accessed",
        wallets: [],
        accounts: [],
      };
    }
  } catch (error) {
    throw error;
  }
};

export const createDeposit = async ({
  accountId,
  amount,
}: {
  accountId: string;
  amount: number;
}) => {
  try {
    await connectDB();

    const transactionAccount = await Account.findById(accountId);

    console.log("Existing transaction account:", transactionAccount);

    if (!transactionAccount) {
      return {
        success: false,
        message: "Cannot perform transaction on a non-existent account",
      };
    }

    const refineData = {
      transaction_accountId: accountId,
      transaction_title: "Funds deposit",
      transaction_hidden_status: false,
      transaction_status: "pending",
      transaction_desc: `a deposit payment of ${amount.toString()}`,
      transaction_amount: formatCurrencyDB(amount),
      transaction_type: "credit",
      transaction_currency: transactionAccount.currency,
      transaction_receiver_name: "same",
      transaction_receiver_bank: "same",
    };

    const newTransaction = await Transaction.create(refineData);

    console.log("New transaction:", newTransaction);

    if (!newTransaction) {
      return {
        success: false,
        message: "Transaction failed. Try again",
      };
    }

    const emailData = {
      accountNumber: transactionAccount.account_number.replace(
        /^(\d{5})\d+(..)/,
        "XXXXX$2XX"
      ),

      accountName: transactionAccount.account_name,
      transactionType: refineData.transaction_type.charAt(0).toUpperCase(),
      transactionAmount: formatCurrencyUI(
        amount * 100,
        transactionAccount.currency
      ),
      createdAt: formatDateString(newTransaction.createdAt.toString()),
      availableBalance: formatCurrencyUI(
        transactionAccount.balance,
        transactionAccount.currency
      ).toString(),
      transactionNarration: refineData.transaction_desc,
      transactionStatus: refineData.transaction_status,
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
      emailData.transactionStatus
    );

    console.log("email response:", emailRes);

    if (emailRes.error) {
      // Rollback transaction if email fails
      await Transaction.findByIdAndDelete(newTransaction._id);
      return {
        success: false,
        message: "Transaction failed. Try again",
      };
    }

    return {
      success: true,
      message: "Transaction created successfully",
    };
  } catch (error) {
    throw error;
  }
};
