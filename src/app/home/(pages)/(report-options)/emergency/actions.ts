"use server";

import { emergencySchema, emergencyStatusEnum } from "@/lib/zod";
import {
  postEmergencyUseCase,
  updateEmergencyStatusUseCase,
} from "@/use-cases/emergencies";
import { EmergencyStatusEnum } from "@prisma/client";
import { z } from "zod";
import { createServerAction } from "zsa";

export const postEmergencyAction = createServerAction()
  .input(emergencySchema)
  .handler(async ({ input }) => {
    const data = await postEmergencyUseCase(input);
    return data;
  });
export const updateEmergencyStatusAction = createServerAction()
  .input(z.object({ id: z.string(), newStatus: emergencyStatusEnum }))
  .handler(async ({ input }) => {
    const data = await updateEmergencyStatusUseCase(
      input.id,
      input.newStatus as EmergencyStatusEnum
    );
    return data;
  });
