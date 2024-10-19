"use server";

import { callStatusEnum, reportSchema } from "@/lib/zod";
import {
  postReportUseCase,
  updateCurrentCallStatusUseCase,
} from "@/use-cases/report";
import { CallStatusEnum } from "@prisma/client";
import { z } from "zod";
import { createServerAction } from "zsa";

const emergencyCallAction = createServerAction()
  .input(reportSchema)
  .handler(async ({ input }) => {
    const data = await postReportUseCase(input);
    return data;
  });

export const cancelCallAction = createServerAction()
  .input(z.object({ id: z.string(), newStatus: callStatusEnum }))
  .handler(async ({ input }) => {
    const data = await updateCurrentCallStatusUseCase(
      input.id,
      input.newStatus as CallStatusEnum
    );
    return data;
  });

export default emergencyCallAction;
