import {
  acceptCall,
  postEmergency,
  findAllEmergencies,
  updateEmergencyStatus,
  findEmergency,
} from "@/data-access/emergencies";
import { emergencySchema } from "@/lib/zod";
import { EmergencyStatusEnum } from "@prisma/client";
import { z } from "zod";

export const getEmergencyUseCase = async (emergencyId: string) => {
  const data = await findEmergency(emergencyId);
  return data;
};

export const getAllEmergenciesUseCase = async () => {
  const data = await findAllEmergencies();

  const pendings = data.filter(({ status }) => status === "PENDING");

  const active = data.filter(({ status }) => status === "ACTIVE");

  const completed = data.filter(({ status }) => status === "COMPLETED");

  const emergencies = [...pendings, ...active, ...completed];

  return { emergencies, pendings, active, completed };
};

export const acceptCallUseCase = async (id: string, recieverId: string) => {
  const data = await acceptCall(id, recieverId);
  return data;
};

export const postEmergencyUseCase = async (
  values: z.infer<typeof emergencySchema>
) => {
  const data = await postEmergency(values);
  return data;
};

export const updateEmergencyStatusUseCase = async (
  id: string,
  newStatus: EmergencyStatusEnum
) => {
  const data = await updateEmergencyStatus(id, newStatus);
  return data;
};
