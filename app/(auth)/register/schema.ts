import { z } from "zod";

export const userSchema = z
  .object({
    firstname: z
      .string({
        required_error: "Firstname is required",
      })
      .trim(),
    lastname: z.string({
      required_error: "Lastname is required",
      invalid_type_error: "Lastname must be a string",
    }),
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
      })
      .email({
        message: "Email is not valid.",
      }),
    pin: z
      .string({
        required_error: "Pin is required",
        invalid_type_error: "Pin must be a string",
      })
      .min(4, {
        message: "pin must be a minimum of 4 characters .",
      })
      .max(4, { message: "pin must be a maximum of 4 characters." }),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(8, {
        message: "password must be a minimum of 8 characters .",
      }),
    confirmPassword: z
      .string({
        required_error: "Confirm Password is required",
      })
      .min(8, {
        message: "confirm password must be a minimum of 8 characters .",
      })
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match.",
    path: ["confirmPassword"], // This specifies where the error should be displayed
  });
