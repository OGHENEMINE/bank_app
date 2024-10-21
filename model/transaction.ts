import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    transaction_accountId: {
      type: String,
      required: true,
    },
    transaction_title: {
      type: String,
      required: true,
    },
    transaction_hidden_status: {
      type: String,
      required: true,
    },
    transaction_status: {
      type: String,
      required: true,
    },
    transaction_desc: {
      type: String,
      default: "",
    },
    transaction_amount: {
      type: Number,
      required: true,
    },
    transaction_type: {
      type: String,
      required: true,
    },
    transaction_currency: {
      type: String,
      required: true,
    },
    transaction_receiver_name: {
      type: String,
      default: "",
    },
    transaction_receiver_bank: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Transaction =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionSchema);

export default Transaction;
