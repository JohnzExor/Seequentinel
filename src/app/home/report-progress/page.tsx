import ReportsTab from "./reports-tab";
import { Separator } from "@/components/ui/separator";
import { getServerSession } from "next-auth";
import { getAllUserReportsUseCase } from "@/use-cases/report";
import { authOptions } from "@/lib/auth";
import { Reports } from "@prisma/client";

const page = async () => {
  let data: Reports[] = [];

  try {
    const session = await getServerSession(authOptions);
    const res = await getAllUserReportsUseCase(session?.user.id as string);

    data = res as Reports[];
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
