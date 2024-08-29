import prisma from "@/lib/db";
import { IBehaviors } from "@/types/definitions";

export const CreateReport = async (newReport: IBehaviors) => {
  const data = await prisma.behaviors.create({ data: newReport });
  return data;
};

export const UpdateReport = async (id: number, updatedReport: IBehaviors) => {
  const data = await prisma.behaviors.update({
    where: { id },
    data: updatedReport,
  });
  return data;
};

export const DeleteReport = async (id: number) => {
  const data = await prisma.behaviors.delete({ where: { id } });
  return data;
};

export const FindAllReports = async () => {
  const data = await prisma.behaviors.findMany({});
  return data;
};

export const FindUserReports = async (userId: number) => {
  const data = await prisma.behaviors.findMany({ where: { userId } });
  return data;
};

export const SetStatus = async (id: number, newStatus: string) => {
  const data = await prisma.behaviors.update({
    where: { id },
    data: { status: newStatus },
  });
  return data;
};
