import prisma from "@/lib/db";
import { behavioralViolationsSchema } from "@/lib/zod";
import { IBehaviors } from "@/types/definitions";
import { z } from "zod";

export const CreateReport = async (
  newReport: z.infer<typeof behavioralViolationsSchema>
) => {
  const data = await prisma.behaviors.create({
    data: {
      ...newReport,
    },
  });
  return data;
};

export const UpdateReport = async (id: string, updatedReport: IBehaviors) => {
  const data = await prisma.behaviors.update({
    where: { id },
    data: updatedReport,
  });
  return data;
};

export const DeleteReport = async (id: string) => {
  const data = await prisma.behaviors.delete({ where: { id } });
  return data;
};

export const FindAllReports = async () => {
  const data = await prisma.behaviors.findMany({});
  return data;
};

export const FindUserReports = async (userId: string) => {
  const data = await prisma.behaviors.findMany({ where: { userId } });
  return data;
};

export const FindReportById = async (id: string) => {
  const data = await prisma.behaviors.findUnique({ where: { id } });
  return data;
};

export const SetStatus = async (id: string, newStatus: string) => {
  const data = await prisma.behaviors.update({
    where: { id },
    data: { status: newStatus },
  });
  return data;
};
