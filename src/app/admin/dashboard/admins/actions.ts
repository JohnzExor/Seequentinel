"use server";

import { createUserSchema, userStatusEnum } from "@/lib/zod";
import {
  accountStatusToggleUseCase,
  createUserUseCase,
} from "@/use-cases/users";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createServerAction } from "zsa";

export const createUserAction = createServerAction()
  .input(createUserSchema)
  .handler(async ({ input }) => {
    const data = await createUserUseCase(input);
    if (data) {
      revalidatePath("/admin/dashboard/admins");
    }
    return data;
  });

export const accountStatusToggleAction = createServerAction()
  .input(z.object({ userId: z.string(), newStatus: userStatusEnum }))
  .handler(async ({ input }) => {
    const data = await accountStatusToggleUseCase(
      input.userId,
      input.newStatus
    );
    if (data) {
      revalidatePath("/admin/dashboard/admins");
    }
    return data;
  });
