import { z } from "zod";

export const AdminTransactionValidation = z.object({
  transaction_accountId: z.string(),
  transaction_title: z
    .string()
    .min(1, { message: "Transaction name is required!" }),
  transaction_type: z.enum(["credit", "debit"], {
    message: "Transaction name is required!",
  }),
  transaction_hidden_status:z.enum(["false", "true"], {
    message: "Transaction hidden status is required!",
  }),
  transaction_desc: z.string(),
  transaction_amount: z.string().min(1, { message: "Amount is required" }),
});
