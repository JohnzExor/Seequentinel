import { createServerAction } from "zsa";
import { LoginSchema } from "./schema";
import { signIn } from "next-auth/react";

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
