"use server";

import { z } from "zod";
import { createServerAction } from "zsa";
import {
  setReportAssigneeUseCase,
  updateReportStatusUseCase,
} from "@/use-cases/reports";
import { changeStatusSchema } from "@/lib/zod";
import { revalidatePath } from "next/cache";

export const SetReportAssignedAction = createServerAction()
  .input(z.object({ documentId: z.string(), userId: z.string() }))
  .handler(async ({ input }) => {
    const data = await setReportAssigneeUseCase(input.documentId, input.userId);
    revalidatePath("/admin/dashboard/assigned-reports");
    return data;
  });

export const setReportStatusAction = createServerAction()
  .input(changeStatusSchema)
  .handler(async ({ input }) => {
    const data = await updateReportStatusUseCase(
      input.documentId,
      input.newStatus
    );
    revalidatePath("/admin/dashboard/assigned-reports");
    return data;
  });
