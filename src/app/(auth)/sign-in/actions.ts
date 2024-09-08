"use server";

import { createServerAction } from "zsa";
import { emailSchema } from "@/lib/zod";
import { checkExistingEmailUseCase } from "@/use-cases/user";

const checkUserEmailAction = createServerAction()
  .input(emailSchema)
  .handler(async ({ input }) => {
    const data = await checkExistingEmailUseCase(input.email);
    return data;
  });

export default checkUserEmailAction;
