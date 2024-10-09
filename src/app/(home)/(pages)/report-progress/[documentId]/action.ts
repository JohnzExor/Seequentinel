"use server";

import { z } from "zod";
import { createServerAction } from "zsa";

import { ArchiveReport as archiveCmr } from "@/data-access/campus-maintenance";
import { ArchiveReport as archiveHvr } from "@/data-access/handbook-violation";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const ArchiveReportAction = createServerAction()
  .input(z.object({ id: z.string(), documentType: z.enum(["cmr", "hvr"]) }))
  .handler(async ({ input }) => {
    const fetchers = {
      cmr: archiveCmr,
      hvr: archiveHvr,
    };

    const data = await fetchers[input.documentType](input.id);
    revalidatePath("/report-progress", redirect("/report-progress"));
    return data;
  });
