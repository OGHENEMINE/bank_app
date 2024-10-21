import { z } from 'zod';

export const updatePasswordSchema = z
  .object({
    password: z.string().min(8, {
      message: "Your password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Your confirm password must be at least 8 characters.",
    }),
    userId: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match.",
    path: ["confirmPassword"], // This specifies where the error should be displayed
  });

