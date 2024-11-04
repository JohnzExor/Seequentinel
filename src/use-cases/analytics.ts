import { getAllReportsUseCase, getMonthlyReportsCountsUseCase } from "./report";
import { getAllUserUseCase } from "./user";

export const getDashboardAnalyticsUseCase = async () => {
  const reports = await getAllReportsUseCase();
  const users = await getAllUserUseCase();
  const monthlyReport = await getMonthlyReportsCountsUseCase();

  return { reports, users, monthlyReport };
};
