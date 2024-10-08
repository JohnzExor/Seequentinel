"use server";

import { z } from "zod";
import { createServerAction } from "zsa";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { archiveReportUseCase } from "@/use-cases/report";

export const ArchiveReportAction = createServerAction()
  .input(z.object({ id: z.string() }))
  .handler(async ({ input }) => {
    const data = await archiveReportUseCase(input.id);
    revalidatePath("/report-progress", redirect("/report-progress"));
    return data;
  });
