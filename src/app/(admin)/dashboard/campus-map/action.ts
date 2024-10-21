"use server";

import { callStatusEnum } from "@/lib/zod";
import { updateCurrentCallStatusUseCase } from "@/use-cases/report";
import { CallStatusEnum } from "@prisma/client";
import { z } from "zod";
import { createServerAction } from "zsa";

export const changeCallStatusAction = createServerAction()
  .input(
    z.object({
      id: z.string(),
      newStatus: callStatusEnum,
      room: z.string().optional(),
    })
  )
  .handler(async ({ input }) => {
    const data = await updateCurrentCallStatusUseCase(
      input.id,
      input.newStatus as CallStatusEnum,
      input.room
    );
    return data;
  });
