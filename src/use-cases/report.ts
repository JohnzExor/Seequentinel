import {
  ArchiveReport,
  CreateReport,
  FindAllAssignedReports,
  FindAllEmergenciesOnTheMap,
  FindAllReports,
  FindAllUserReports,
  FindMonthlyReportsCounts,
  FindReportById,
  FindReportsByStatus,
  FindReportTypeReports,
  updateCurrentCallStatus,
  updateEmergencyLocation,
  UpdateReportAssignee,
  UpdateReportStatus,
} from "@/data-access/report";
import {
  reportSchema,
  reportTypeEnum,
  statusEnum,
  updateLocationSchema,
} from "@/lib/zod";
import { z } from "zod";
import { ReportResponse } from "./send-email";
import { CallStatusEnum } from "@prisma/client";

export const updateEmergencyLocationUseCase = async (
  values: z.infer<typeof updateLocationSchema>
) => {
  const data = await updateEmergencyLocation(values);
  return data;
};

export const updateCurrentCallStatusUseCase = async (
  id: string,
  newStatus: CallStatusEnum
) => {
  const data = await updateCurrentCallStatus(id, newStatus);
  return data;
};

export const getAllEmergenciesOnTheMapUseCase = async () => {
  const data = await FindAllEmergenciesOnTheMap();
  return data;
};

export const setReportAssigneeUseCase = async (
  documentId: string,
  userId: string
) => {
  const data = await UpdateReportAssignee(documentId, userId);
  return data;
};

export const getAllAssignedReportsUseCase = async (userId: string) => {
  const data = await FindAllAssignedReports(userId);
  return data;
};

export const postReportUseCase = async (
  newReport: z.infer<typeof reportSchema>
) => {
  const data = await CreateReport(newReport);
  if (!data) throw new Error("Report creation failed");

  // const emailResponse = await ReportResponse();
  // if (!emailResponse) {
  //   throw new Error("Email not send");
  // }
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

export const getAllReportsUseCase = async () => {
  const data = await FindAllReports();
  return data;
};

export const getMonthlyReportsCountsUseCase = async () => {
  const data = await FindMonthlyReportsCounts();
  return data;
};

export const getReportsByStatusUseCase = async (
  status: z.infer<typeof statusEnum>
) => {
  const data = await FindReportsByStatus(status);
  return data;
};
export const updateReportStatusUseCase = async (
  documentId: string,
  newStatus: z.infer<typeof statusEnum>
) => {
  const data = await UpdateReportStatus(documentId, newStatus);
  return data;
};
