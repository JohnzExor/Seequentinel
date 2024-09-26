"use server";

import { campusMaintenanceSchema } from "@/lib/zod";
import { postReportUseCase } from "@/use-cases/campus-maintenance";
import { createServerAction } from "zsa";

const faultyFacilitiesAction = createServerAction()
  .input(campusMaintenanceSchema)
  .handler(async ({ input }) => {
    const data = await postReportUseCase(input);
    return data;
  });

export default faultyFacilitiesAction;
