import mongoose from "mongoose";

const walletSchema = new mongoose.Schema(
  {
    crypto_asset: {
      type: String,
      required: true,
    },
    wallet_address: {
      type: String,
      required: true,
      unique: true,
    },
    symbol: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Wallet = mongoose.models.Wallet || mongoose.model("Wallet", walletSchema);

export default Wallet;
