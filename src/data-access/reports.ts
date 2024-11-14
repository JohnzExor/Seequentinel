import prisma from "@/lib/db";
import { reportSchema, statusEnum } from "@/lib/zod";
import { z } from "zod";

export const updateReportAssignee = async (
  documentId: string,
  userId: string
) => {
  const data = await prisma.reports.update({
    where: { id: documentId },
    data: { assginedUserId: userId, status: "Reviewing" },
  });
  return data;
};

export const updateReportStatus = async (
  documentId: string,
  newStatus: z.infer<typeof statusEnum>
) => {
  const data = await prisma.reports.update({
    where: { id: documentId },
    data: { status: newStatus },
  });
  return data;
};

export const findAllReports = async () => {
  const data = await prisma.reports.findMany({
    orderBy: { createdAt: "desc" },
  });
  return data;
};

export const findUserReports = async (userId: string) => {
  const data = await prisma.reports.findMany({
    where: { userId, isArchived: false },
    orderBy: { createdAt: "desc" },
  });
  return data;
};

export const findReport = async (documentId: string) => {
  const data = await prisma.reports.findUnique({ where: { id: documentId } });
  return data;
};

export const archiveReport = async (documentId: string) => {
  const data = await prisma.reports.update({
    where: { id: documentId },
    data: { isArchived: true },
  });
  return data;
};

export const createReport = async (newReport: z.infer<typeof reportSchema>) => {
  const data = await prisma.reports.create({ data: newReport });
  return data;
};
