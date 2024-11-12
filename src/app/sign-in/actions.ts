"use server";

import { createServerAction } from "zsa";
import { emailSchema } from "@/lib/zod";
import { getExistingEmailUseCase } from "@/use-cases/users";

const checkUserEmailAction = createServerAction()
  .input(emailSchema)
  .handler(async ({ input }) => {
    const data = await getExistingEmailUseCase(input.email);
    return data;
  });

export default checkUserEmailAction;
