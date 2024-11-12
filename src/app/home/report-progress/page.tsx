import { Separator } from "@/components/ui/separator";
import React from "react";
import ReportsTab from "./reports-tab";
import { Reports } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUserReportsUseCase } from "@/use-cases/users";

const page = async () => {
  let data: { reports: Reports[]; cmr: Reports[]; hvr: Reports[] } = {
    reports: [],
    cmr: [],
    hvr: [],
  };
  let error;

  try {
    const session = await getServerSession(authOptions);
    if (session?.user.id) data = await getUserReportsUseCase(session?.user.id);
  } catch (err) {
    console.error(err);
    error = "Error fetching data";
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
      <ReportsTab data={data} />
    </div>
  );
};

export default page;
