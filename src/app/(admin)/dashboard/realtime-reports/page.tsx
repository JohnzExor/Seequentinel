import { Separator } from "@/components/ui/separator";
import RealtimeReports from "./realtime-reports";
import { getReportsByStatusUseCase } from "@/use-cases/report";

const page = async () => {
  const data = await getReportsByStatusUseCase("Request");

  return (
    <div>
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
