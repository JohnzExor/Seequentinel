import prisma from "@/lib/db";
import { emergencyResponseFeedbackSchema } from "@/lib/zod";
import { IEmergencyResponseFeedback } from "@/types/definitions";
import { z } from "zod";

export const CreateReport = async (
  newReport: z.infer<typeof emergencyResponseFeedbackSchema>
) => {
  const data = await prisma.emergencies.create({ data: newReport });
  return data;
};

export const UpdateReport = async (
  id: string,
  updatedReport: IEmergencyResponseFeedback
) => {
  const data = await prisma.emergencies.update({
    where: { id },
    data: updatedReport,
  });
  return data;
};

export const DeleteReport = async (id: string) => {
  const data = await prisma.emergencies.delete({ where: { id } });
  return data;
};

export const FindAllReports = async () => {
  const data = await prisma.emergencies.findMany({});
  return data;
};

export const FindUserReports = async (userId: string) => {
  const data = await prisma.emergencies.findMany({ where: { userId } });
  return data;
};

export const SetStatus = async (id: string, newStatus: string) => {
  const data = await prisma.emergencies.update({
    where: { id },
    data: { status: newStatus },
  });
  return data;
};