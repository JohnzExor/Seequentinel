"use server";

import { reportSchema } from "@/lib/zod";
import { postReportUseCase } from "@/use-cases/report";
import { createServerAction } from "zsa";

const campusMaintenanceAction = createServerAction()
  .input(reportSchema)
  .handler(async ({ input }) => {
    const data = await postReportUseCase(input);
    return data;
  });

export default campusMaintenanceAction;
