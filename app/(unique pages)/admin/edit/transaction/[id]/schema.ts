import { z } from "zod";

export const editTransactionSchema = z.object({
  id: z.string(),
  transaction_amount: z.number(),
  transaction_status: z.string(),
  transaction_hidden_status: z.string(),
});
