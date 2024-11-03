import { Separator } from "@/components/ui/separator";
import { getAllAssignedReportsUseCase } from "@/use-cases/report";
import ReportsTab from "./reports-tab";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { notFound } from "next/navigation";
import { Reports } from "@prisma/client";

const page = async () => {
  let data: Reports[] = [];

  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      notFound();
    }
    const res = await getAllAssignedReportsUseCase(session?.user.id);
    data = res as Reports[];
  } catch (error: any) {
    console.error(error.message);
  }

  return (
    <div className=" p-4 md:p-7 xl:p-10">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Assigned Reports</h2>
        <p className="text-muted-foreground">
          View all the reports you&apos;re assigned
        </p>
      </div>
      <Separator className="my-6" />
      <ReportsTab reports={data} />
    </div>
  );
};

export default page;
