import { getAllReports } from "@/use-cases/report";
import ReportStatusDistribution from "./report-status-distribution";
import ReportTypes from "./report-types";
import ReportsOverview from "./reports-overview";
import CountCards from "./count-cards";
import { getAllUserUseCase } from "@/use-cases/user";

const page = async () => {
  const reports = await getAllReports();
  const users = await getAllUserUseCase();
  return (
    <div className=" space-y-4">
      <div>
        <h1 className=" text-xl font-bold">Dashboard Data Analytics</h1>
        <p className="text-sm text-muted-foreground">Updated {Date()}</p>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 items-start gap-4">
        <CountCards reports={reports} userCount={users.length} />
        <ReportsOverview />
        <ReportStatusDistribution reports={reports} />
        <ReportTypes reports={reports} />
      </div>
    </div>
  );
};

export default page;
