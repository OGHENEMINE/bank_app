import { Wallet } from "lucide-react";
import { z } from "zod";

export const depositSchema = z.object({
  amount: z.coerce.number().min(1, {
    message: "Amount is required",
  }),
  accountId: z.string().min(1, { message: "Account Id is required" }),
  wallet: z.string().min(1, { message: "wallet is required" }),
});
