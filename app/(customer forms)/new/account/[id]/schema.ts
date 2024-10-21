import { z } from "zod";

export const newAccountSchema = z.object({
  userId: z.string(),
  accountName: z.string().min(1, {
    message: "account name is required",
  }),
  accountType: z.string().min(1, {
    message: "account type is required",
  }),
  currency: z.string(),
});
