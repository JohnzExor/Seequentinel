import ReportStatusDistribution from "./report-status-distribution";
import ReportTypes from "./report-types";
import ReportsOverview from "./reports-overview";
import CountCards from "./count-cards";
import { getAllUserUseCase } from "@/use-cases/user";
import RecentReports from "./recent-reports";
import {
  getAllReportsUseCase,
  getMonthlyReportsCountsUseCase,
} from "@/use-cases/report";

const page = async () => {
  const reports = await getAllReportsUseCase();
  const users = await getAllUserUseCase();
  const monthlyReport = await getMonthlyReportsCountsUseCase();
  return (
    <div className=" space-y-4">
      <div>
        <h1 className=" text-xl font-bold">Dashboard Data Analytics</h1>
        <p className="text-sm text-muted-foreground">Updated {Date()}</p>
      </div>
      <div className=" md:grid space-y-4 md:space-y-0 grid-cols-1 md:grid-cols-2 gap-4">
        <CountCards reports={reports} userCount={users.length} />
        <ReportsOverview data={monthlyReport} />
        <RecentReports reports={reports.slice(-6)} />
        <ReportStatusDistribution reports={reports} />
        <ReportTypes reports={reports} />
      </div>
    </div>
  );
};

export default page;
