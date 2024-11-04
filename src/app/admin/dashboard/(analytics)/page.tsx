import ReportStatusDistribution from "./report-status-distribution";
import ReportTypes from "./report-types";
import ReportsOverview from "./reports-overview";
import CountCards from "./count-cards";
import RecentReports from "./recent-reports";
import { getDashboardAnalyticsUseCase } from "@/use-cases/analytics";
import { Reports, User } from "@prisma/client";

type TData = {
  reports: Reports[];
  users: User[];
  monthlyReport: { [key: string]: number };
};

const page = async () => {
  let data: TData = {
    reports: [],
    users: [],
    monthlyReport: {},
  };

  try {
    data = await getDashboardAnalyticsUseCase();
  } catch (error: any) {
    console.error(error.message);
  }

  const { reports, users, monthlyReport } = data;

  return (
    <div className=" space-y-4  p-4 md:p-7 xl:p-10">
      <div>
        <h1 className=" text-xl font-bold">Dashboard Data Analytics</h1>
        <p className="text-sm text-muted-foreground">Updated {Date()}</p>
      </div>
      <div className=" lg:grid space-y-4 lg:space-y-0 lg:grid-cols-2 gap-4">
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
