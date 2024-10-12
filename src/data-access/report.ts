import prisma from "@/lib/db";
import { reportSchema, reportTypeEnum } from "@/lib/zod";
import { z } from "zod";

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
