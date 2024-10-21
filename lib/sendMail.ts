import "server-only";
import PasswordUpdateOTP from "@/email/PasswordUpdateOTP";
import { Resend } from "resend";
import VerifyEmail from "@/email/VerifyEmail";
import TransactionNotification from "@/email/TransactionNotification";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOTP = async (email: string, otp: string, username: string) => {
  try {
    const data = await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: "mineoghorodi@gmail.com",
      subject: "Password Reset",
      react: PasswordUpdateOTP({ otp, username }),
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const sendVerifyEmailLink = async (
  email: string,
  link: string,
  username: string
) => {
  try {
    const data = await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: "mineoghorodi@gmail.com",
      subject: "Account verification",
      react: VerifyEmail({ link, username }),
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const sendTransactionEmail = async (
  accountNumber: string,
  transactionType: string,
  transactionAmount: string,
  createdAt: string,
  availableBalance: string,
  transactionNarration: string,
  transactionStatus: string
) => {
  try {
    const data = await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: "mineoghorodi@gmail.com",
      subject: `${transactionType} Transaction Notification`,
      react: TransactionNotification({
        accountNumber,
        transactionType,
        transactionAmount,
        createdAt,
        availableBalance,
        transactionNarration,
        transactionStatus
      }),
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
