import {
  ArchiveReport,
  CreateReport,
  FindAllAssignedReports,
  FindAllReports,
  FindAllUserReports,
  FindMonthlyReportsCounts,
  FindReportById,
  FindReportsByStatus,
  FindReportTypeReports,
  UpdateReportAssignee,
  UpdateReportStatus,
} from "@/data-access/report";
import { reportSchema, reportTypeEnum, statusEnum } from "@/lib/zod";

import { z } from "zod";
import { ReportResponse } from "./send-email";

import { Book, ConstructionIcon } from "lucide-react";
import { Reports } from "@prisma/client";

const titles = {
  CampusMaintenance: "Campus Maintenance Request",
  HandbookViolation: "Handbook Violation Report",
};

const icons = {
  CampusMaintenance: ConstructionIcon,
  HandbookViolation: Book,
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
  const res = await FindAllUserReports(id);

  if (!res) {
    return {
      totalReports: 0,
      totalCampusMaintenance: 0,
      totalHandbookViolation: 0,
      allReports: [],
      maintenanceReports: [],
      handbookReports: [],
    };
  }

  const mapReportToCard = ({
    id,
    reportType,
    problemType,
    status,
    createdAt,
  }: Reports) => ({
    id: id,
    reportType: titles[reportType],
    problemType: problemType,
    status: status,
    createdAt: createdAt,
    icon: icons[reportType],
    path: `/home/report-progress/${id}`,
  });

  const campusMaintenance = res
    .filter(({ reportType }) => reportType === "CampusMaintenance")
    .map(mapReportToCard);

  const handbookViolation = res
    .filter(({ reportType }) => reportType === "HandbookViolation")
    .map(mapReportToCard);

  const allReports = res.map(mapReportToCard);

  return {
    totalReports: res.length,
    totalCampusMaintenance: campusMaintenance.length,
    totalHandbookViolation: handbookViolation.length,
    allReports: allReports,
    maintenanceReports: campusMaintenance,
    handbookReports: handbookViolation,
  };
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
