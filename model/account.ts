import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    account_userId: {
      type: String,
      required: true,
    },
    account_name: {
      type: String,
      required: true,
    },
    account_type: {
      type: String,
      required: true,
    },
    account_number: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
      default: 0 
    },
    currency: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Account = mongoose.models.Account || mongoose.model("Account", accountSchema);

export default Account;
