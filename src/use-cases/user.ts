import {
  ExistingUserEmail,
  FindUserByID,
  UpdateUserPassword,
} from "@/data-access/user";

import { CreateUser, FindAllUser } from "@/data-access/user";
import { changePasswordSchema, createUserSchema } from "@/lib/zod";
import { z } from "zod";
import { createAuditLogsUseCase } from "./audit-logs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { WelcomeUser } from "./send-email";

import { compare } from "bcryptjs";

export const getAllUserUseCase = async () => {
  const data = await FindAllUser("USER");
  return data;
};

export const getAllAdminUseCase = async () => {
  const data = await FindAllUser("ADMIN");
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
        objectType: data.role,
        objectId: data.id,
        status: data ? "success" : "failed",
        description: `Added ${data.role}`,
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
  const user = await FindUserByID(values.id as string);

  if (!user) {
    throw new Error("User not found");
  }

  const comparePassword = await compare(values.currentPassword, user.password);

  if (!comparePassword) {
    throw new Error("The current password is wrong.");
  }

  const compareOldPassword = await compare(values.newPassword, user.password);

  if (compareOldPassword) {
    throw new Error("You cant use the same password.");
  }

  const data = await UpdateUserPassword(values);
  if (!data) {
    throw new Error("Error Changing Password");
  }
  return data;
};
