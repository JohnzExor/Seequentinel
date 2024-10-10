import {
  ArchiveReport,
  CreateReport,
  FindAllUserReports,
  FindReportById,
  FindReportTypeReports,
} from "@/data-access/report";
import { reportSchema, reportTypeEnum } from "@/lib/zod";
import { z } from "zod";
import { ReportResponse } from "./send-email";

export const postReportUseCase = async (
  newReport: z.infer<typeof reportSchema>
) => {
  const data = await CreateReport(newReport);
  if (!data) throw new Error("Report creation failed");

  const emailResponse = await ReportResponse();
  if (!emailResponse) {
    throw new Error("Email not send");
  }
  return data;
};

export const archiveReportUseCase = async (id: string) => {
  const data = await ArchiveReport(id);
  return data;
};

export const getAllUserReportsUseCase = async (id: string) => {
  const data = await FindAllUserReports(id);
  return data;
};

export const getUserReportByIdUseCase = async (id: string) => {
  const data = await FindReportById(id);
  return data;
};

export const getReportTypeReportsUseCase = async (
  reportType: z.infer<typeof reportTypeEnum>
) => {
  const data = await FindReportTypeReports(reportType);
  return data;
};
