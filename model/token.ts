import mongoose from "mongoose";

const tokenschema = new mongoose.Schema(
  {
    token_userId: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    usage: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Token = mongoose.models.Token || mongoose.model("Token", tokenschema);

export default Token;
