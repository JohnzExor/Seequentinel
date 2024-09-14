"use server";

import { emergencyResponseFeedbackSchema } from "@/lib/zod";
import { postReportUseCase } from "@/use-cases/emergencies";
import { createServerAction } from "zsa";

const emergencyResponseFeedbackAction = createServerAction()
  .input(emergencyResponseFeedbackSchema)
  .handler(async ({ input }) => {
    const data = await postReportUseCase(input);
    return data;
  });

export default emergencyResponseFeedbackAction;

