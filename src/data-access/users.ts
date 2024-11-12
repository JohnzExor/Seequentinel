import prisma from "@/lib/db";
import { createUserSchema } from "@/lib/zod";
import { UserStatusEnum } from "@prisma/client";
import { compare, hash } from "bcryptjs";
import { z } from "zod";

export const findUserEmail = async (email: string) => {
  const data = await prisma.user.findUnique({ where: { email } });
  return data;
};

export const createUser = async (newUser: z.infer<typeof createUserSchema>) => {
  const hashPWD = await hash(newUser.password, 10);

  const data = await prisma.user.create({
    data: { ...newUser, password: hashPWD },
  });

  return data;
};

export const updateAccountStatus = async (
  id: string,
  newstatus: UserStatusEnum
) => {
  const data = await prisma.user.update({
    where: { id },
    data: { status: newstatus },
  });
  return data;
};

export const findAllAdmins = async () => {
  const data = await prisma.user.findMany({ where: { role: "ADMIN" } });
  return data;
};

export const findAllUsers = async () => {
  const data = await prisma.user.findMany({ where: { role: "USER" } });
  return data;
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new Error("Email not found");
  }

  const comparePassword = await compare(password, user.password);

  if (!comparePassword) {
    throw new Error("Invalid Password");
  }

  return user;
};

export const findExistingEmail = async (email: string) => {
  const data = await prisma.user.findUnique({ where: { email } });
  return data;
};
