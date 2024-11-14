import { findUserReports } from "@/data-access/reports";
import {
  createUser,
  findAdminAssignedReports,
  findAllAdmins,
  findAllUsers,
  findExistingEmail,
  findUserById,
  findUserEmail,
  updateAccountStatus,
  updateUserPassword,
} from "@/data-access/users";
import { authOptions } from "@/lib/auth";
import { changePasswordSchema, createUserSchema } from "@/lib/zod";
import { Reports, UserStatusEnum } from "@prisma/client";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { compare } from "bcryptjs";

export const changeUserPasswordUseCase = async (
  values: z.infer<typeof changePasswordSchema>
) => {
  const user = await findUserById(values.id as string);

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

  const data = await updateUserPassword(values);
  if (!data) {
    throw new Error("Error Changing Password");
  }
  return data;
};

export const getAdminAssignedReports = async (userId: string) => {
  const reports = await findAdminAssignedReports(userId);
  if (!reports)
    return {} as { reports: Reports[]; cmr: Reports[]; hvr: Reports[] };

  const cmr = reports.filter(
    ({ reportType }) => reportType === "CampusMaintenance"
  );
  const hvr = reports.filter(
    ({ reportType }) => reportType === "HandbookViolation"
  );

  return { reports, cmr, hvr };
};

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
  if (!data) {
    throw new Error("Email not found");
  }
  return data;
};
