import prisma from "@/lib/db";
import { reportSchema } from "@/lib/zod";
import { z } from "zod";

export const findAllReports = async () => {
  const data = await prisma.reports.findMany({
    orderBy: { createdAt: "desc" },
  });
  return data;
};

export const findUserReports = async (userId: string) => {
  const data = await prisma.reports.findMany({
    where: { userId },
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
