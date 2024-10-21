import { z } from "zod";

export const editUserSchema = z.object({
  userId: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().email(),
  role: z.enum(["admin", "customer"], {
    message: "Invalid user role",
  }),
  pin: z
    .string()
    .min(4, {
      message: "Your pin must be a minimum of 4 characters.",
    })
    .max(4, { message: "Your pin must be a maximum of 4 characters." }),
});
