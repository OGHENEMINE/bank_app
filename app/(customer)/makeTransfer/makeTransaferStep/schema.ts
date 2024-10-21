import { z } from "zod";

export const ExternalTransferValidation = z.object({
    bank: z.string().min(1, { message: "bank is required" }),
    amount: z
      .string()
      .min(1, { message: "amount is required" })
      .regex(/^\d+$/, { message: "Amount must be a valid number" }),
    description: z.string(),
    receiverAccount: z.string().min(1, { message: "receiver is required" }),
  });
  
  
  export const InternalTransferValidation = z.object({
    amount: z
      .string()
      .min(1, { message: "amount is required" })
      .regex(/^\d+$/, { message: "Amount must be a valid number" }),
    receiverAccount: z.string().min(1, { message: "receiver is required" }),
    description: z.string(),
  });
  