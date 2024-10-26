import prisma from "@/lib/db";
import {
  reportSchema,
  reportTypeEnum,
  statusEnum,
  updateLocationSchema,
} from "@/lib/zod";
import { CallStatusEnum } from "@prisma/client";
import { z } from "zod";

export const updateEmergencyLocation = async ({
  id,
  gpsCoordinates,
  location,
}: z.infer<typeof updateLocationSchema>) => {
  const data = await prisma.reports.update({
    where: { id },
    data: {
      gpsCoordinates,
      location,
    },
  });
  return data;
};

export const updateCurrentCallStatus = async (
  id: string,
  newStatus: CallStatusEnum
) => {
  const data = await prisma.reports.update({
    where: { id },
    data: {
      callStatus: newStatus,
    },
  });
  return data;
};

export const FindAllEmergenciesOnTheMap = async () => {
  const data = await prisma.reports.findMany({
    where: { reportType: "Emergencies", callStatus: "Pending" },
  });
  return data;
};

export const UpdateReportAssignee = async (
  documentId: string,
  userId: string
) => {
  const data = await prisma.reports.update({
    where: { id: documentId },
    data: { assginedUserId: userId, status: "Reviewing" },
  });
  return data;
};

export const UpdateReportStatus = async (
  documentId: string,
  newStatus: z.infer<typeof statusEnum>
) => {
  const data = await prisma.reports.update({
    where: { id: documentId },
    data: { status: newStatus },
  });
  return data;
};
export const FindAllAssignedReports = async (userId: string) => {
  const data = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      assignedReports: {},
    },
  });
  return data?.assignedReports;
};

export const CreateReport = async (newReport: z.infer<typeof reportSchema>) => {
  const data = await prisma.reports.create({ data: newReport });
  return data;
};

export const ArchiveReport = async (id: string) => {
  const data = await prisma.reports.update({
    where: { id },
    data: { isArchived: true },
  });
  return data;
};

export const FindAllUserReports = async (id: string) => {
  const data = await prisma.user.findUnique({
    where: { id },
    include: {
      reports: { where: { isArchived: false } },
    },
  });
  return data?.reports;
};

export const FindReportById = async (id: string) => {
  const data = await prisma.reports.findUnique({
    where: { id },
  });
  return data;
};

export const FindReportsByStatus = async (
  status: z.infer<typeof statusEnum>
) => {
  const data = await prisma.reports.findMany({
    where: { status },
  });
  return data;
};

export const FindReportTypeReports = async (
  reportType: z.infer<typeof reportTypeEnum>
) => {
  const data = await prisma.reports.findMany({
    where: { reportType },
  });
  return data;
};

export const FindAllReports = async () => {
  const data = await prisma.reports.findMany();
  return data;
};

export const FindMonthlyReportsCounts = async () => {
  const reportCounts = await prisma.reports.groupBy({
    by: ["createdAt"],
    _count: {
      id: true, // Count the number of reports
    },
    orderBy: {
      createdAt: "asc", // Sort by date
    },
  });

  // Define the shape of the monthlyCounts object
  const monthlyCounts: { [key: string]: number } = {};

  // Transform data into a monthly summary
  reportCounts.forEach((report) => {
    const month = new Date(report.createdAt).toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });

    // Safely index the object by using a type with string keys
    if (!monthlyCounts[month]) {
      monthlyCounts[month] = 0;
    }
    monthlyCounts[month] += report._count.id;
  });

  return monthlyCounts;
};
