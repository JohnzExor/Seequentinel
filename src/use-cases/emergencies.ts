import {
  acceptCall,
  findAllEmergencies,
  postEmergency,
  updateEmergencyStatus,
} from "@/data-access/emergencies";
import { emergencySchema } from "@/lib/zod";
import { EmergencyStatusEnum } from "@prisma/client";
import { z } from "zod";

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

export const getAllEmergenciesUseCase = async () => {
  const data = await findAllEmergencies();
  return data;
};

export const updateEmergencyStatusUseCase = async (
  id: string,
  newStatus: EmergencyStatusEnum
) => {
  const data = await updateEmergencyStatus(id, newStatus);
  return data;
};
