"use server";

import { reportSchema } from "@/lib/zod";
import { createReportUseCase } from "@/use-cases/reports";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createServerAction } from "zsa";

const handbookViolationAction = createServerAction()
  .input(reportSchema)
  .handler(async ({ input }) => {
    const data = await createReportUseCase(input);
    if (data) {
      revalidatePath(
        "/home/report-progress",
        redirect(`/home/report-progress/${data.id}`)
      );
    }
    return data;
  });

export default handbookViolationAction;
