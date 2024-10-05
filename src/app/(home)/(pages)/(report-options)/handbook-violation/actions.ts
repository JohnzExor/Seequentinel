"use server";

import { handbookViolationSchema } from "@/lib/zod";
import { postReportUseCase } from "@/use-cases/handbook-violation";
import { createServerAction } from "zsa";

const behavioralViolationsAction = createServerAction()
  .input(handbookViolationSchema)
  .handler(async ({ input }) => {
    const data = await postReportUseCase(input);
    return data;
  });

export default behavioralViolationsAction;
