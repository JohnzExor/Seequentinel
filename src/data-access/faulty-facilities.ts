import prisma from "@/lib/db";
import { IFaultyFacilities } from "@/types/definitions";

export const CreateReport = async (newReport: IFaultyFacilities) => {
  const data = await prisma.faultyFacilities.create({ data: newReport });
  return data;
};

export const UpdateReport = async (
  id: number,
  updatedReport: IFaultyFacilities
) => {
  const data = await prisma.faultyFacilities.update({
    where: { id },
    data: updatedReport,
  });
  return data;
};

export const DeleteReport = async (id: number) => {
  const data = await prisma.faultyFacilities.delete({ where: { id } });
  return data;
};

export const FindAllReports = async () => {
  const data = await prisma.faultyFacilities.findMany({});
  return data;
};

export const FindUserReports = async (userId: number) => {
  const data = await prisma.faultyFacilities.findMany({ where: { userId } });
  return data;
};

export const SetStatus = async (id: number, newStatus: string) => {
  const data = await prisma.faultyFacilities.update({
    where: { id },
    data: { status: newStatus },
  });
  return data;
};
