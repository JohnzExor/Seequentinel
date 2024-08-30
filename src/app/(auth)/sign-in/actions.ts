import { createServerAction } from "zsa";
import { signIn } from "next-auth/react";
import { LoginSchema } from "@/lib/zod";

const loginUserAction = createServerAction()
  .input(LoginSchema)
  .handler(async ({ input }) => {
    const data = signIn("credentials", {
      email: input.email,
      password: input.password,
      redirect: false,
    });
    return data;
  });

export default loginUserAction;
