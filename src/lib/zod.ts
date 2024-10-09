import { z } from "zod";
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const emailSchema = z.object({
  email: z.string().min(1, "Corporate email is required").max(50),
});

export const loginSchema = z.object({
  email: z.string().min(1, "Corporate email is required").max(50),
  password: z.string().min(1, "Password is required").max(50),
});

export const createUserSchema = z.object({
  email: z.string().min(1, "Corporate email is required").max(50),
  password: z.string().min(1, "Password is required").max(50),
  status: z.enum(["active", "disabled"]),
  type: z.enum(["user", "admin"]),
});

export const campusMaintenanceSchema = z.object({
  type: z.string().min(1, "type is required").max(255),
  media: z.array(z.string()),
  location: z.string().min(1, "Location is required").max(255),
  userId: z.string().min(1, "UserID is required").max(50).optional(),
  status: z.enum(["Request", "Reviewing", "Accepted", "Completed"]),
  additionalDetails: z.string().min(1, "Specify details").max(1000).optional(),
});

export const handbookViolationSchema = z.object({
  violation: z.string().min(1, "Specify violation").max(255),
  evidence: z.array(z.string()),
  location: z.string().min(1, "Location is required").max(255),
  violationDate: z.date({
    required_error: "Please select a date and time",
    invalid_type_error: "That's not a date",
  }),
  violationDetails: z.string().min(1, "Specify details").max(1000),
  userId: z.string().min(1, "UserID is required").max(50).optional(),
  status: z.enum(["Request", "Reviewing", "Accepted", "Completed"]),
  violatorName: z.string().min(1).max(50),
});

export const emergencyResponseFeedbackSchema = z.object({
  type: z.string().min(1, "type is required").max(255),
  details: z.string().min(1, "Specify feedback").max(255),
  userId: z.string().min(1, "UserID is required").max(50).optional(),
  status: z.enum(["Request", "Reviewing", "Accepted", "Completed"]),
});

export const auditLogSchema = z.object({
  eventType: z.enum(["update", "delete", "create"]),
  userId: z.string().min(1),
  ipAddress: z.string().min(1),
  objectType: z.string().min(1),
  objectId: z.string().min(1),
  previousState: z.any().optional(),
  newState: z.any().optional(),
  status: z.string().min(1, "Status is required"),
  description: z.string().optional(),
  source: z.string().optional(),
});
