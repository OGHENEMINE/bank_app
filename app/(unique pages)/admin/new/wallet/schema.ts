import { symbol, z } from "zod";

export const WalletValidation = z.object({
  wallet_address: z.string().min(1, { message: "Wallet address is required" }),
  crypto_asset: z.string().min(1, { message: "Crypto asset is required" }),
  image: z.string().min(1),
  symbol: z.string().min(1),
  price: z.number(),
});
