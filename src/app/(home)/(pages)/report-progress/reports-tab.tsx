import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReportsCard from "./reports-card";

import { authOptions } from "@/lib/auth";

import { getServerSession } from "next-auth";
import { getAllUserReportsUseCase } from "@/use-cases/user";
import { notFound } from "next/navigation";
import { Book, ConstructionIcon, Siren } from "lucide-react";

const ReportsTab = async () => {
  const session = await getServerSession(authOptions);

  const userId = session?.user.id.toString() as string;
  const data = await getAllUserReportsUseCase(userId);

  if (!data) {
    notFound();
  }

  const { behaviorsReports, faultyFacilitiesReports, emergencyReports } = data;

  const cmrData = faultyFacilitiesReports
    .map((report) => ({
      ...report,
      reportType: "Campus Maintenance Request",
      path: `/report-progress/cmr/${report.id}`,
      icon: <ConstructionIcon size={15} />,
    }))
    .reverse();

  const hvrData = behaviorsReports
    .map((report) => ({
      ...report,
      reportType: "Handbook Violation Report",
      path: `/report-progress/hvr/${report.id}`,
      icon: <Book size={15} />,
    }))
    .reverse();

  const erlData = emergencyReports
    .map((report) => ({
      ...report,
      reportType: "Emergency Report Log",
      path: `/report-progress/erl/${report.id}`,
      icon: <Siren size={15} />,
    }))
    .reverse();

  const reports = [...cmrData, ...hvrData, ...erlData];

  const sortedReports = reports.sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );
  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList>
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        <TabsTrigger value="violations">Violations</TabsTrigger>
        <TabsTrigger value="emergencies">Emergencies</TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <ReportsCard data={sortedReports} />
      </TabsContent>
      <TabsContent value="maintenance">
        <ReportsCard data={cmrData} />
      </TabsContent>
      <TabsContent value="violations">
        <ReportsCard data={hvrData} />
      </TabsContent>
      <TabsContent value="emergencies">
        <ReportsCard data={erlData} />
      </TabsContent>
    </Tabs>
  );
};

export default ReportsTab;
