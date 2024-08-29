import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().min(1, "Corporate email is required").max(50),
  password: z.string().min(1, "Password is required").max(50),
});
