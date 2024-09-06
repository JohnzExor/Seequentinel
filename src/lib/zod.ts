import { z } from "zod";

export const emailSchema = z.object({
  email: z.string().min(1, "Corporate email is required").max(50),
});

export const loginSchema = z.object({
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

export const behavioralViolationsSchema = z.object({
  violation: z.string().min(1, "Specify violation").max(255),
  evidence: z.string().optional(),
  location: z.string().min(1, "Location is required").max(255),
  violationDate: z.date({
    required_error: "Please select a date and time",
    invalid_type_error: "That's not a date",
  }),
  violationDetails: z.string().min(1, "Specify details").max(255),
  userId: z.string().min(1, "UserID is required").max(50).optional(),
  status: z.enum(["Request" || "Reviewing" || "Accepted" || "Completed"]),
});
