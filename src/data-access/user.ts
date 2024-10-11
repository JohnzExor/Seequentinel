import prisma from "@/lib/db";
import { changePasswordSchema, createUserSchema } from "@/lib/zod";
import { compare, hash } from "bcryptjs";
import { z } from "zod";

export const FindAllUser = async (type: string) => {
  const data = await prisma.user.findMany({ where: { type } });
  return data;
};

export const ExistingUserEmail = async (email: string) => {
  const data = await prisma.user.findUnique({ where: { email } });
  return data;
};

export const FindUserByID = async (id: string) => {
  const data = await prisma.user.findUnique({ where: { id } });
  return data;
};

export const CreateUser = async (newUser: z.infer<typeof createUserSchema>) => {
  const hashPWD = await hash(newUser.password, 10);

  const data = await prisma.user.create({
    data: { ...newUser, password: hashPWD },
  });

  return data;
};

export const DeleteUser = async (id: string) => {
  const data = await prisma.user.delete({ where: { id } });
  return data;
};

export const UpdateUserPassword = async ({
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

export const LoginUser = async (email: string, password: string) => {
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
