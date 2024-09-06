"use server";

import { behavioralViolationsSchema } from "@/lib/zod";
import { postReportUseCase } from "@/use-cases/behaviors";
import { createServerAction } from "zsa";

const behavioralViolationsAction = createServerAction()
  .input(behavioralViolationsSchema)
  .handler(async ({ input }) => {
    const data = await postReportUseCase(input);
    return data;
  });

export default behavioralViolationsAction;
