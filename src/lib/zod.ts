import { z } from "zod";

export const reportTypeEnum = z.enum([
  "CampusMaintenance",
  "Emergencies",
  "HandbookViolation",
]);

export const statusEnum = z
  .enum(["Request", "Reviewing", "Accepted", "Completed"])
  .optional();

export const callStatusEnum = z
  .enum(["None", "Pending", "Connected", "Disconnected", "Canceled", "Failed"])
  .optional();

export const emergencyStatusEnum = z
  .enum([
    "PENDING", // Call is initiated but not answered yet
    "ACTIVE", // Call is ongoing
    "COMPLETED", // Call has ended successfully
    "CANCELED", // Call was canceled before being completed
    "FAILED", // Call failed due to technical issues
  ])
  .optional();

export const emergencySchema = z.object({
  userId: z.string(),

  peerId: z.string().optional(),
  recieverId: z.string().optional(),

  location: z.string().optional(),
  gpsCoordinates: z.string().optional(),
});

export const updateLocationSchema = z.object({
  id: z.string(),
  gpsCoordinates: z.string(),
  location: z.string(),
});

export const changeStatusSchema = z.object({
  documentId: z.string(),
  newStatus: statusEnum,
  isAccepted: z.boolean(),
});

export const reportSchema = z.object({
  reportType: reportTypeEnum,

  // Common fields
  problemType: z.string().min(1, "type is required").max(255),
  location: z.string().min(1, "Location is required").max(255).optional(),
  userId: z.string().min(1, "UserID is required").max(50).optional(),
  status: statusEnum,
  details: z.string().min(1, "Specify details").max(1000).optional(),

  // Handbook Violation-specific fields
  violatorName: z.string().min(1).max(50).optional(),
  violationDate: z
    .date({
      required_error: "Please select a date and time",
      invalid_type_error: "That's not a date",
    })
    .optional(),

  // Emergency-specific fields
  callStatus: callStatusEnum,
  peerId: z.string().optional(),
  gpsCoordinates: z.string().optional(),

  // Shared media/evidence field
  attachments: z.array(z.string()),
});

export const emailSchema = z.object({
  email: z.string().min(1, "Corporate email is required").max(50),
});

export const loginSchema = z.object({
  email: z.string().min(1, "Corporate email is required").max(50),
  password: z.string().min(1, "Password is required").max(50),
});

export const changePasswordSchema = z.object({
  id: z.string().optional(),
  currentPassword: z.string().min(1, "Enter your current password").max(50),
  newPassword: z.string().min(6, "Password is required").max(50),
  confirmNewPassword: z.string().min(6, "Password is required").max(50),
});

export const createUserSchema = z.object({
  email: z.string().min(1, "Corporate email is required").max(50),
  password: z.string().min(1, "Password is required").max(50),
  status: z.enum(["active", "disabled"]),
  type: z.enum(["user", "admin"]),
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
