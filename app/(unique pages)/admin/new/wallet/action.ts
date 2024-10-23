"use server";

import connectDB from "@/lib/db";
import { WalletValidation } from "./schema";
import Wallet from "@/model/wallet";

export const getCryptoAssets = async () => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&sparkline=false`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch crypto assets.");
    }

    const data = await response.json();

    console.log("Fetched crypto assets:", data);

    return {
      success: true,
      message: "Data fetched successfully",
      data: data.map(
        (item: {
          id: string;
          symbol: string;
          name: string;
          image: string;
          current_price: number;
        }) => ({
          id: item.id,
          symbol: item.symbol,
          name: item.name,
          image: item.image,
          price: item.current_price,
        })
      ),
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching crypto assets:", error.message);
    }

    // Ensure a return value in the catch block
    return {
      success: false,
      message: "Failed to fetch crypto assets. Connect to the internet",
      data: [],
    };
  }
};

export const addAWallet = async (form: FormData) => {
  try {
    const data = {
      wallet_address: form.get("wallet_address") as string,
      crypto_asset: form.get("crypto_asset") as string,
      symbol: form.get("symbol") as string,
      image: form.get("image") as string,
      price: Number(form.get("price")) as number,
    };

    console.log(data);

    const validation = WalletValidation.safeParse(data);
    console.log(validation);

    if (!validation.success) {
      return {
        success: false,
        message: "Validation failed",
        error: validation.error.flatten(),
      };
    }

    await connectDB();

    const wallet = await Wallet.create(data);
    console.log("wallet created", wallet);

    if (wallet) {
      return {
        success: true,
        message: "Wallet added successfully",
      };
    } else {
      return {
        success: false,
        message: "Failed to add wallet",
      };
    }
  } catch (error) {
    throw error;
  }
};
