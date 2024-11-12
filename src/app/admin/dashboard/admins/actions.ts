"use server";

import { createUserSchema, userStatusEnum } from "@/lib/zod";
import {
  accountStatusToggleUseCase,
  createUserUseCase,
} from "@/use-cases/users";
import { z } from "zod";
import { createServerAction } from "zsa";

export const createUserAction = createServerAction()
  .input(createUserSchema)
  .handler(async ({ input }) => {
    const data = await createUserUseCase(input);
    return data;
  });

export const accountStatusToggleAction = createServerAction()
  .input(z.object({ userId: z.string(), newStatus: userStatusEnum }))
  .handler(async ({ input }) => {
    const data = await accountStatusToggleUseCase(
      input.userId,
      input.newStatus
    );
    return data;
  });
