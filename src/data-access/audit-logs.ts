import prisma from "@/lib/db";

export const findAllAuditLogs = async () => {
  const data = await prisma.auditLog.findMany();
  return data;
};
