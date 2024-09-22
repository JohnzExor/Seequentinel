import { ExistingUserEmail, FindAllUserReports } from "@/data-access/user";

import { CreateUser, FindAllUser } from "@/data-access/user";
import { createUserSchema } from "@/lib/zod";
import { z } from "zod";
import { createAuditLogsUseCase } from "./audit-logs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const getAllUserReportsUseCase = async (id: string) => {
  const data = await FindAllUserReports(id);
  return data;
};

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
  const existing = await ExistingUserEmail(newUser.email);
  if (existing) {
    throw new Error("This email is already registered.");
  }
  const data = await CreateUser(newUser);

  const session = await getServerSession(authOptions);

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

  return data;
};

export const checkExistingEmailUseCase = async (email: string) => {
  const existing = await ExistingUserEmail(email);
  if (!existing) {
    throw new Error("Email not found");
  }
  return existing;
};
