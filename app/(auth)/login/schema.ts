import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email({
      message: "Email is not valid.",
    }),
    
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, {
      message: "password must be a minimum of 8 characters .",
    }),
});
