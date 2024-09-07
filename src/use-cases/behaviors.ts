import { CreateReport, FindUserReports } from "@/data-access/behaviors";
import { behavioralViolationsSchema } from "@/lib/zod";
import { z } from "zod";

export const postReportUseCase = async (
  newReport: z.infer<typeof behavioralViolationsSchema>
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