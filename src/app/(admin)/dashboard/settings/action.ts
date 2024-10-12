"use server";

import { changePasswordSchema } from "@/lib/zod";
import { changeUserPasswordUseCase } from "@/use-cases/user";
import { createServerAction } from "zsa";

export const changePasswordAction = createServerAction()
  .input(changePasswordSchema)
  .handler(({ input }) => {
    const data = changeUserPasswordUseCase(input);
    return data;
  });
