"use server";

import { callStatusEnum, reportSchema, updateLocationSchema } from "@/lib/zod";
import {
  postReportUseCase,
  updateCurrentCallStatusUseCase,
  updateEmergencyLocationUseCase,
} from "@/use-cases/report";
import { CallStatusEnum } from "@prisma/client";
import { z } from "zod";
import { createServerAction } from "zsa";

export const emergencyCallAction = createServerAction()
  .input(reportSchema)
  .handler(async ({ input }) => {
    const data = await postReportUseCase(input);
    return data;
  });

export const changeCallStatusAction = createServerAction()
  .input(z.object({ id: z.string(), newStatus: callStatusEnum }))
  .handler(async ({ input }) => {
    const data = await updateCurrentCallStatusUseCase(
      input.id,
      input.newStatus as CallStatusEnum
    );
    return data;
  });

export const updateEmergencyLocationAction = createServerAction()
  .input(updateLocationSchema)
  .handler(async ({ input }) => {
    const data = await updateEmergencyLocationUseCase(input);
    return data;
  });
