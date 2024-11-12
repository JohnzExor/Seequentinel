"use server";

import { emergencySchema } from "@/lib/zod";
import { postEmergencyUseCase } from "@/use-cases/emergencies";
import { createServerAction } from "zsa";

export const postEmergencyAction = createServerAction()
  .input(emergencySchema)
  .handler(async ({ input }) => {
    const data = await postEmergencyUseCase(input);
    return data;
  });
