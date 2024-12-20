import prisma from "@/lib/db";
import { changePasswordSchema, createUserSchema } from "@/lib/zod";
import { UserStatusEnum } from "@prisma/client";
import { compare, hash } from "bcryptjs";
import { z } from "zod";

export const findAdminAssignedReports = async (userId: string) => {
  const data = await prisma.user.findUnique({
    where: { id: userId },
    include: { assignedReports: true },
  });
  return data?.assignedReports;
};

export const findUserById = async (id: string) => {
  const data = await prisma.user.findUnique({ where: { id } });
  return data;
};

export const updateUserPassword = async ({
  id,
  newPassword,
}: z.infer<typeof changePasswordSchema>) => {
  const hashPWD = await hash(newPassword, 10);
  const data = await prisma.user.update({
    where: { id },
    data: { password: hashPWD },
  });
  return data;
};

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
  const data = await prisma.user.findMany({
    where: { role: "ADMIN" },
    orderBy: { createdAt: "desc" },
  });
  return data;
};

export const findAllUsers = async () => {
  const data = await prisma.user.findMany({
    where: { role: "USER" },
    orderBy: { createdAt: "desc" },
  });
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
