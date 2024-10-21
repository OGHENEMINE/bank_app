"use server";

import connectDB from "@/lib/db";
import { formatDateString } from "@/lib/formatDate";
import Wallet from "@/model/wallet";
import { symbol } from "zod";

export const getWallet = async (search: string) => {
  try {
    await connectDB();

    let wallets;
    if (search !== "") {
      wallets = await Wallet.find({
        $or: [
          { crypto_asset: { $regex: search, $options: "i" } }, // case-insensitive search
          { symbol: { $regex: search, $options: "i" } },
        ],
      });
    } else {
      wallets = await Wallet.find();
    }

    console.log(wallets);

    if (wallets) {
      return {
        success: true,
        message: "Wallet accessed successfully",
        wallets: wallets.map((item) => ({
          id: item._id.toString(),
          symbol: item.symbol,
          name: item.crypto_asset,
          image: item.image,
          address: item.wallet_address,
          price: item.price,
          createdAt: formatDateString(item.createdAt as string),
        })),
      };
    } else {
      return {
        success: false,
        message: "Wallet can not be accessed",
        wallets: [],
      };
    }
  } catch (error) {
    throw error;
  }
};

export const deleteWallet = async (id: string) => {
  try {
    await connectDB();

    const wallet = await Wallet.findByIdAndDelete(id);
    if (wallet) {
      return {
        success: true,
        message: "Wallet deleted successfully",
      };
    } else {
      return {
        success: false,
        message: "Wallet can not be deleted",
      };
    }
  } catch (error) {
    throw error;
  }
};
