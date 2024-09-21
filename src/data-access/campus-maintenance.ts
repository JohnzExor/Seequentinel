import prisma from "@/lib/db";
import { faultyFacilitiesSchema } from "@/lib/zod";
import { IFaultyFacilities } from "@/types/definitions";
import { z } from "zod";

export const CreateReport = async (
  newReport: z.infer<typeof faultyFacilitiesSchema>
) => {
  const data = await prisma.faultyFacilities.create({ data: newReport });
  return data;
};

export const UpdateReport = async (
  id: string,
  updatedReport: IFaultyFacilities
) => {
  const data = await prisma.faultyFacilities.update({
    where: { id },
    data: updatedReport,
  });
  return data;
};

export const DeleteReport = async (id: string) => {
  const data = await prisma.faultyFacilities.delete({ where: { id } });
  return data;
};

export const FindAllReports = async () => {
  const data = await prisma.faultyFacilities.findMany({});
  return data;
};

export const FindUserReports = async (userId: string) => {
  const data = await prisma.faultyFacilities.findMany({ where: { userId } });
  return data;
};

export const FindReportById = async (id: string) => {
  const data = await prisma.faultyFacilities.findUnique({ where: { id } });
  return data;
};

export const SetStatus = async (id: string, newStatus: string) => {
  const data = await prisma.faultyFacilities.update({
    where: { id },
    data: { status: newStatus },
  });
  return data;
};
