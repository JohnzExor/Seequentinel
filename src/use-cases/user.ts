import { ExistingUserEmail, UpdateUserPassword } from "@/data-access/user";

import { CreateUser, FindAllUser } from "@/data-access/user";
import { changePasswordSchema, createUserSchema } from "@/lib/zod";
import { z } from "zod";
import { createAuditLogsUseCase } from "./audit-logs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { WelcomeUser } from "./send-email";

export const getAllUserUseCase = async () => {
  const data = await FindAllUser("user");
  return data;
};

export const getAllAdminUseCase = async () => {
  const data = await FindAllUser("admin");
  return data;
};

export const createUserUseCase = async (
  newUser: z.infer<typeof createUserSchema>
) => {
  const session = await getServerSession(authOptions);

  if (session) {
    const existing = await ExistingUserEmail(newUser.email);
    if (existing) {
      throw new Error("This email is already registered.");
    }
    const data = await CreateUser(newUser);

    if (data) {
      await createAuditLogsUseCase({
        eventType: "create",
        userId: session?.user.id as string,
        ipAddress: "",
        objectType: data.type,
        objectId: data.id,
        status: data ? "success" : "failed",
        description: `Added ${data.type}`,
        source: "",
      });

      // await WelcomeUser(session.user.email);
    }

    return data;
  }

  throw new Error("Error creating user, no currrent session");
};

export const checkExistingEmailUseCase = async (email: string) => {
  const existing = await ExistingUserEmail(email);
  if (!existing) {
    throw new Error("Email not found");
  }
  return existing;
};

export const changeUserPasswordUseCase = async (
  values: z.infer<typeof changePasswordSchema>
) => {
  const data = await UpdateUserPassword(values);
  if (!data) {
    throw new Error("Error Changing Password");
  }
  return data;
};
