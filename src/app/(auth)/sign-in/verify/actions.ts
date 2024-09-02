import { createServerAction } from "zsa";
import { signIn } from "next-auth/react";
import { loginSchema } from "@/lib/zod";

const loginUserAction = createServerAction()
  .input(loginSchema)
  .handler(async ({ input }) => {
    const data = signIn("credentials", {
      email: input.email,
      password: input.password,
      redirect: false,
    });
    return data;
  });

export default loginUserAction;
