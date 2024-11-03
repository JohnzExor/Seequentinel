import { Separator } from "@/components/ui/separator";
import RealtimeReports from "./realtime-reports";
import { getReportsByStatusUseCase } from "@/use-cases/report";
import { Reports } from "@prisma/client";

const page = async () => {
  let data: Reports[] = [];

  try {
    const res = await getReportsByStatusUseCase("Request");
    data = res;
  } catch (error: any) {
    console.error(error.message);
  }

  return (
    <div className=" p-4 md:p-7 xl:p-10">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Real-time Reports</h2>
        <p className="text-muted-foreground">View all available reports</p>
      </div>
      <Separator className="my-6" />
      <RealtimeReports data={data} />
    </div>
  );
};

export default page;
