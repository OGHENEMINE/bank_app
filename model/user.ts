import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    email: {
      type: String,
      unique: true,
      required: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    password: String,
    pin: String,
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "customer",
    },
    otp: {
      type: String,
    },
    otp_expires_at: {
      type: Date,
      default: new Date(Date.now() + 15 * 60 * 1000),
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
