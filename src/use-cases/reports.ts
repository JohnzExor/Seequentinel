import {
  archiveReport,
  createReport,
  findAllReports,
  findReport,
} from "@/data-access/reports";
import { reportSchema } from "@/lib/zod";
import { z } from "zod";

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
