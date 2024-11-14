"use server";

import { z } from "zod";
import { createServerAction } from "zsa";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { archiveReportUseCase } from "@/use-cases/reports";

export const ArchiveReportAction = createServerAction()
  .input(z.object({ id: z.string() }))
  .handler(async ({ input }) => {
    const data = await archiveReportUseCase(input.id);
    console.log(data);
    revalidatePath("/report-progress", redirect("/home/report-progress"));
    return data;
  });
