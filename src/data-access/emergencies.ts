import prisma from "@/lib/db";
import { emergencySchema } from "@/lib/zod";
import { EmergencyStatusEnum } from "@prisma/client";
import { z } from "zod";

export const findEmergency = async (emergencyId: string) => {
  const data = await prisma.emergencies.findUnique({
    where: { id: emergencyId },
  });
  return data;
};

export const findAllEmergencies = async () => {
  const data = await prisma.emergencies.findMany();
  return data;
};

export const updateEmergencyStatus = async (
  id: string,
  newStatus: EmergencyStatusEnum
) => {
  const data = await prisma.emergencies.update({
    where: { id: id },
    data: { status: newStatus },
  });
  return data;
};

export const acceptCall = async (id: string, recieverId: string) => {
  const data = await prisma.emergencies.update({
    where: { id },
    data: { recieverId: recieverId, status: "ACTIVE" },
  });
  return data;
};

export const postEmergency = async (
  values: z.infer<typeof emergencySchema>
) => {
  const data = await prisma.emergencies.create({ data: values });
  return data;
};
