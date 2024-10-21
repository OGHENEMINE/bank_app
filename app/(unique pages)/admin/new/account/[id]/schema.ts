import currencies from "@/lib/currency";
import { z } from "zod";

export const AccountValidation = z.object({
  account_userId: z.string(),
  account_name: z.string().min(1, { message: "Account name is required" }),
  account_type: z.enum(["savings", "current", "corporate"], {
    message: "account type is required",
  }),
  currency: z.enum(["", ...Object.keys(currencies)], {
    message: "invalid currency",
  }),
  balance: z.coerce
    .number()
    .min(1, { message: "Account balance is required!" }),
});
