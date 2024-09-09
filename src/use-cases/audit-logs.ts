import { CreateAuditLog, FindAllAuditlogs } from "@/data-access/audit-logs";
import { auditLogSchema } from "@/lib/zod";
import { z } from "zod";

export const createAuditLogsUseCase = async (
  newAuditLog: z.infer<typeof auditLogSchema>
) => {
  const data = await CreateAuditLog(newAuditLog);
  return data;
};

export const findAllAuditLogsUseCase = async () => {
  const data = await FindAllAuditlogs();
  return data;
};
