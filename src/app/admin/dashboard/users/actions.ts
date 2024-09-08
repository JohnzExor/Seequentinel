"use server";

import { createUserSchema } from "@/lib/zod";
import { createUserUseCase } from "@/use-cases/user";
import { createServerAction } from "zsa";

const createUserAction = createServerAction()
  .input(createUserSchema)
  .handler(async ({ input }) => {
    const data = await createUserUseCase(input);
    return data;
  });
export default createUserAction;
