import ReportsTab from "./reports-tab";
import { Separator } from "@/components/ui/separator";
import { getServerSession } from "next-auth";
import { getAllUserReportsUseCase } from "@/use-cases/report";
import { authOptions } from "@/lib/auth";
import { TReportProgressCard } from "@/types/definitions";

export type TReportProgressData = {
  totalReports: number;
  totalCampusMaintenance: number;
  totalHandbookViolation: number;
  allReports: TReportProgressCard[];
  maintenanceReports: TReportProgressCard[];
  handbookReports: TReportProgressCard[];
};

const page = async () => {
  let data: TReportProgressData = {
    totalReports: 0,
    totalCampusMaintenance: 0,
    totalHandbookViolation: 0,
    allReports: [],
    maintenanceReports: [],
    handbookReports: [],
  };

  try {
    const session = await getServerSession(authOptions);
    if (session?.user) {
      data = await getAllUserReportsUseCase(session.user.id);
    }
  } catch (error: any) {
    console.error(error.message);
  }

  return (
    <div className=" p-6 md:p-10 space-y-4 w-full">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Report Progress</h2>
        <p className="text-muted-foreground">
          View all your reports and track their current status.
        </p>
      </div>
      <Separator className="my-6" />
      <ReportsTab reports={data} />
    </div>
  );
};

export default page;
