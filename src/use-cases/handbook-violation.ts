import {
  CreateReport,
  FindAllReports,
  FindReportById,
  FindUserReports,
} from "@/data-access/handbook-violation";
import { behavioralViolationsSchema } from "@/lib/zod";
import { z } from "zod";

export const postReportUseCase = async (
  newReport: z.infer<typeof behavioralViolationsSchema>
) => {
  const data = await CreateReport(newReport);
  if (!data) throw new Error("Report creation failed");
  return data;
};

export const getUserReportsUseCase = async (userId: string) => {
  const data = await FindUserReports(userId);
  if (!data) throw new Error("Finding user reports failed");
  return data;
};

export const getAllReportsUseCase = async () => {
  const data = await FindAllReports();
  if (!data) throw new Error("Finding all reports failed");
  return data;
};

export const getUserReportByIdUseCase = async (id: string) => {
  const data = await FindReportById(id);
  if (!data) throw new Error("error getting report");
  return data;
};
