import { findAllAuditLogs } from "@/data-access/audit-logs";

export const getAllAuditLogsUseCase = async () => {
  const data = await findAllAuditLogs();
  return data;
};
