import { z } from "zod";

export const editTokenSchema = z.object({
  id: z.string(),
  token: z.string(),
  usage: z.string(),
});
