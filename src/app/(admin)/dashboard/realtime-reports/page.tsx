import { Separator } from "@/components/ui/separator";
import { getAllReports } from "@/use-cases/report";
import RealtimeReports from "./realtime-reports";

const page = async () => {
  const data = await getAllReports();

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
