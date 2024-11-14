import { Separator } from "@/components/ui/separator";
import React from "react";
import ReportsTab from "./reports-tab";
import { Reports } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getAdminAssignedReports } from "@/use-cases/users";

const page = async () => {
  let data: { reports: Reports[]; cmr: Reports[]; hvr: Reports[] } = {
    reports: [],
    cmr: [],
    hvr: [],
  };
  let error;

  try {
    const session = await getServerSession(authOptions);
    if (session?.user.id)
      data = await getAdminAssignedReports(session?.user.id);
  } catch (err) {
    console.error(err);
    error = "Error fetching data";
  }

  return (
    <div className=" p-6 md:p-10 space-y-4 w-full">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Assigned Reports</h2>
        <p className="text-muted-foreground">
          See all the reports you have assigned.
        </p>
      </div>
      <Separator className="my-6" />
      {!error ? <ReportsTab data={data} /> : error}
    </div>
  );
};

export default page;
