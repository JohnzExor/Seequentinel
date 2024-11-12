import { findUserReports } from "@/data-access/reports";
import {
  createUser,
  findAllAdmins,
  findAllUsers,
  findExistingEmail,
  findUserEmail,
  updateAccountStatus,
} from "@/data-access/users";
import { authOptions } from "@/lib/auth";
import { createUserSchema } from "@/lib/zod";
import { UserStatusEnum } from "@prisma/client";
import { getServerSession } from "next-auth";
import { z } from "zod";

export const getUserReportsUseCase = async (userId: string) => {
  const reports = await findUserReports(userId);
  const cmr = reports.filter(
    ({ reportType }) => reportType === "CampusMaintenance"
  );
  const hvr = reports.filter(
    ({ reportType }) => reportType === "HandbookViolation"
  );

  return { reports, cmr, hvr };
};

export const getAllAdminsUseCase = async () => {
  const data = await findAllAdmins();
  return data;
};

export const getAllUsersUseCase = async () => {
  const data = await findAllUsers();
  return data;
};

export const accountStatusToggleUseCase = async (
  id: string,
  newStatus: UserStatusEnum
) => {
  const data = await updateAccountStatus(id, newStatus);
  return data;
};

export const createUserUseCase = async (
  newUser: z.infer<typeof createUserSchema>
) => {
  const session = await getServerSession(authOptions);

  if (session) {
    const existing = await findUserEmail(newUser.email);
    if (existing) {
      throw new Error("This email is already registered.");
    }
    const data = await createUser(newUser);

    return data;
  }

  throw new Error("Error creating user, no currrent session");
};

export const getExistingEmailUseCase = async (email: string) => {
  const data = await findExistingEmail(email);
  return data;
};
