import { z } from "zod";

export const tokenValidation = z.object({
  userId: z.string().min(1, {
    message: "Token is required",
  }),
  length: z.string(),
  type: z.string(),
});
