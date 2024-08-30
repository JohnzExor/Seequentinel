import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().min(1, "Corporate email is required").max(50),
  password: z.string().min(1, "Password is required").max(50),
});

export const faultyFacilitiesSchema = z.object({
  type: z.string().min(1, "type is required").max(255),
  media: z.string().optional(),
  location: z.string().min(1, "Location is required").max(255),
  userId: z.string().min(1, "UserID is required").max(50).optional(),
  status: z.enum(["Request" || "Reviewing" || "Accepted" || "Completed"]),
});
