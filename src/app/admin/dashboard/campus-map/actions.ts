"use server";

import { emergencyStatusEnum } from "@/lib/zod";
import {
  acceptCallUseCase,
  updateEmergencyStatusUseCase,
} from "@/use-cases/emergencies";
import { EmergencyStatusEnum } from "@prisma/client";
import { z } from "zod";
import { createServerAction } from "zsa";

export const acceptCallAction = createServerAction()
  .input(z.object({ id: z.string(), recieverId: z.string() }))
  .handler(async ({ input }) => {
    const data = await acceptCallUseCase(input.id, input.recieverId);
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
