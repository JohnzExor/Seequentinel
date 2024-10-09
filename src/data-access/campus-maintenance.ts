import prisma from "@/lib/db";
import { campusMaintenanceSchema } from "@/lib/zod";
import { z } from "zod";

export const CreateReport = async (
  newReport: z.infer<typeof campusMaintenanceSchema>
) => {
  const data = await prisma.campusMaintenance.create({ data: newReport });
  return data;
};

export const UpdateReport = async (
  id: string,
  updatedReport: z.infer<typeof campusMaintenanceSchema>
) => {
  const data = await prisma.campusMaintenance.update({
    where: { id },
    data: updatedReport,
  });
  return data;
};

export const DeleteReport = async (id: string) => {
  const data = await prisma.campusMaintenance.delete({ where: { id } });
  return data;
};

export const FindAllReports = async () => {
  const data = await prisma.campusMaintenance.findMany({});
  return data;
};

export const FindUserReports = async (userId: string) => {
  const data = await prisma.campusMaintenance.findMany({
    where: { userId, isArchived: true },
    cacheStrategy: { ttl: 60 },
  });
  return data;
};

export const FindReportById = async (id: string) => {
  const data = await prisma.campusMaintenance.findUnique({
    where: { id },
    cacheStrategy: { ttl: 60 },
  });
  return data;
};

export const SetStatus = async (id: string, newStatus: string) => {
  const data = await prisma.campusMaintenance.update({
    where: { id },
    data: { status: newStatus },
  });
  return data;
};

export const ArchiveReport = async (id: string) => {
  const data = await prisma.campusMaintenance.update({
    where: { id },
    data: { isArchived: true },
  });
  return data;
};
