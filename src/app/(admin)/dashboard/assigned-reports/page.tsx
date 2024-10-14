import { Separator } from "@/components/ui/separator";
import { getAllAssignedReportsUseCase } from "@/use-cases/report";
import ReportsTab from "./reports-tab";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { notFound } from "next/navigation";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    notFound();
  }
  const data = await getAllAssignedReportsUseCase(session?.user.id);
  if (!data) {
    notFound();
  }
  return (
    <div>
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Real-time Reports</h2>
        <p className="text-muted-foreground">View all available reports</p>
      </div>
      <Separator className="my-6" />
      <ReportsTab reports={data} />
    </div>
  );
};

export default page;
