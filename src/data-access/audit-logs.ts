import prisma from "@/lib/db";
import { auditLogSchema } from "@/lib/zod";
import { z } from "zod";

export const CreateAuditLog = async (
  newAuditLog: z.infer<typeof auditLogSchema>
) => {
  const data = await prisma.auditLog.create({ data: newAuditLog });
  return data;
};

export const FindAllAuditlogs = async () => {
  const data = await prisma.auditLog.findMany();
  return data;
};
