import { CreateReport, FindUserReports } from "@/data-access/faulty-facilities";
import { faultyFacilitiesSchema } from "@/lib/zod";
import { IFaultyFacilities } from "@/types/definitions";
import { FaultyFacilities } from "@prisma/client";
import { useSession } from "next-auth/react";
import { z } from "zod";

export const postReportUseCase = async (
  newReport: z.infer<typeof faultyFacilitiesSchema>
) => {
  const data = await CreateReport(newReport);
  if (!data) throw new Error("Report creation failed");
  return data;
};

export const getUserReportsUseCase = async (userId: string) => {
  const data = await FindUserReports(userId);
  if (!data) throw new Error("Finding user reports failed");
  return data;
};
