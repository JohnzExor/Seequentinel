import {
  archiveReport,
  createReport,
  findAllReports,
  findReport,
  updateReportAssignee,
  updateReportStatus,
} from "@/data-access/reports";
import { reportSchema, statusEnum } from "@/lib/zod";
import { z } from "zod";

export const setReportAssigneeUseCase = async (
  documentId: string,
  userId: string
) => {
  const data = await updateReportAssignee(documentId, userId);
  return data;
};

export const updateReportStatusUseCase = async (
  documentId: string,
  newStatus: z.infer<typeof statusEnum>
) => {
  const data = await updateReportStatus(documentId, newStatus);
  return data;
};

export const getAllReportsUseCase = async () => {
  const data = await findAllReports();
  return data;
};

export const getReportUseCase = async (documentId: string) => {
  const data = await findReport(documentId);
  return data;
};

export const archiveReportUseCase = async (documentId: string) => {
  const data = await archiveReport(documentId);
  return data;
};

export const createReportUseCase = async (
  newReport: z.infer<typeof reportSchema>
) => {
  const data = await createReport(newReport);
  return data;
};
