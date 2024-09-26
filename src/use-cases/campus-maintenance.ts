import {
  CreateReport,
  FindAllReports,
  FindReportById,
  FindUserReports,
} from "@/data-access/campus-maintenance";
import { campusMaintenanceSchema } from "@/lib/zod";
import { z } from "zod";
import { ReportResponse } from "./send-email";

export const postReportUseCase = async (
  newReport: z.infer<typeof campusMaintenanceSchema>
) => {
  const data = await CreateReport(newReport);
  if (!data) throw new Error("Report creation failed");

  const emailResponse = await ReportResponse();
  if (!emailResponse) {
    throw new Error("Email not send");
  }
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
