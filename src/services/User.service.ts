import prisma from "@/lib/db";
import { IUser } from "@/lib/definitions";
import { compare, hash } from "bcryptjs";

export const ExistingUserEmail = async (email: string) => {
  try {
    const data = await prisma.user.findUnique({ where: { email } });
    return data;
  } catch (error) {
    throw error;
  }
};

export const FindUserByID = async (id: number) => {
  try {
    const data = await prisma.user.findUnique({ where: { id } });
    return data;
  } catch (error) {
    throw error;
  }
};

export const CreateUser = async (newUser: IUser) => {
  try {
    const hashPWD = await hash(newUser.password, 10);

    const data = await prisma.user.create({
      data: { ...newUser, password: hashPWD },
    });

    return data;
  } catch (error) {
    throw error;
  }
};

export const DeleteUser = async (id: number) => {
  try {
    const data = await prisma.user.delete({ where: { id } });
    return data;
  } catch (error) {
    throw error;
  }
};

export const UpdatePassword = async (id: number, password: string) => {
  try {
    const hashPWD = await hash(password, 10);
    const newPassword = await prisma.user.update({
      where: { id },
      data: { password: hashPWD },
    });
    return newPassword;
  } catch (error) {
    throw error;
  }
};

export const LoginUser = async (email: string, password: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new Error("Email not found");
    }

    const comparePassword = await compare(password, user.password);

    if (!comparePassword) {
      throw new Error("Invalid Password");
    }

    return user;
  } catch (error) {
    throw error;
  }
};
