import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReportsCard from "./reports-card";

import { authOptions } from "@/lib/auth";

import { getServerSession } from "next-auth";
import { getAllUserReportsUseCase } from "@/use-cases/user";
import { notFound } from "next/navigation";
import { Book, ConstructionIcon, Siren } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ReportsTab = async () => {
  const session = await getServerSession(authOptions);

  const userId = session?.user.id.toString() as string;
  const data = await getAllUserReportsUseCase(userId);

  if (!data) {
    notFound();
  }

  const {
    handbookViolationReports,
    campusMaintenanceReports,
    emergencyReports,
  } = data;

  const cmrData = campusMaintenanceReports
    .map((report) => ({
      ...report,
      reportType: "Campus Maintenance Request",
      path: `/report-progress/${report.id}?type=cmr`,
      icon: <ConstructionIcon size={15} />,
    }))
    .reverse();

  const hvrData = handbookViolationReports
    .map((report) => ({
      ...report,
      reportType: "Handbook Violation Report",
      path: `/report-progress/${report.id}?type=hvr`,
      icon: <Book size={15} />,
    }))
    .reverse();

  const erlData = emergencyReports
    .map((report) => ({
      ...report,
      reportType: "Emergency Report Log",
      path: `/report-progress/${report.id}?type=erl`,
      icon: <Siren size={15} />,
    }))
    .reverse();

  const reports = [...cmrData, ...hvrData, ...erlData];

  const sortedReports = reports.sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );
  return (
    <Tabs defaultValue="all" className="w-full">
      <div className=" overflow-x-auto pb-3">
        <TabsList>
          <TabsTrigger value="all">
            All Reports <Badge className="ml-1">{reports.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="maintenance" className="flex items-center gap-1">
            <ConstructionIcon size={15} />
            <span>Campus Maintenance</span>
            <Badge>{cmrData.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="violations" className="flex items-center gap-1">
            <Book size={15} />
            <span>Handbook Violations</span>
            <Badge>{hvrData.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="emergencies" className="flex items-center gap-1">
            <Siren size={15} />
            <span>Emergencies</span>
            <Badge>{erlData.length}</Badge>
          </TabsTrigger>
        </TabsList>
      </div>
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
