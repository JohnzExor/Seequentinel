"use server";

import { reportSchema } from "@/lib/zod";
import { createReportUseCase } from "@/use-cases/reports";
import { createServerAction } from "zsa";

const campusMaintenanceAction = createServerAction()
  .input(reportSchema)
  .handler(async ({ input }) => {
    const data = await createReportUseCase(input);
    return data;
  });

export default campusMaintenanceAction;
