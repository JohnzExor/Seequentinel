import { ExistingUserEmail } from "@/data-access/user";

import { CreateUser, FindAllUser } from "@/data-access/user";
import { createUserSchema } from "@/lib/zod";
import { z } from "zod";

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
  return data;
};

export const checkExistingEmailUseCase = async (email: string) => {
  const existing = await ExistingUserEmail(email);
  if (!existing) {
    throw new Error("Email not found");
  }
  return existing;
};
