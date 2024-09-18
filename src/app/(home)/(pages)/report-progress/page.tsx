import { authOptions } from "@/lib/auth";
import { getUserReportsUseCase as getHandbookRequest } from "@/use-cases/campus-maintenance";
import { getUserReportsUseCase as getBehavioral } from "@/use-cases/handbook-violation";
import { getUserReportsUseCase as getEmergencies } from "@/use-cases/emergencies";

import { getServerSession } from "next-auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ReportsCard from "./reports-card";

const page = async () => {
  const session = await getServerSession(authOptions);

  const userId = session?.user.id.toString() as string;

  const campusMaintenanceData = await getHandbookRequest(userId);

  const behavioralData = await getBehavioral(userId);

  const emergenciesData = await getEmergencies(userId);

  const AllReportData = [
    ...campusMaintenanceData.map(({ id, type, status, createdAt }) => ({
      id,
      reportType: "Campus Maintenance Request",
      type: type,
      status,
      createdAt: new Date(createdAt),
    })),
    ...behavioralData.map(({ id, violation, status, createdAt }) => ({
      id,
      reportType: "Handbook Violation Report",
      type: violation,
      status,
      createdAt: new Date(createdAt),
    })),
    ...emergenciesData.map(({ id, type, status, createdAt }) => ({
      id,
      reportType: "Emergencies",
      type: type,
      status,
      createdAt: new Date(createdAt),
    })),
  ];

  return (
    <div className=" p-4 md:p-8 space-y-4 w-full">
      <div>
        <h1 className=" text-xl font-bold">Report Progress</h1>
        <p className="text-sm text-muted-foreground">Updated {Date()}</p>
      </div>
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="violations">Violations</TabsTrigger>
          <TabsTrigger value="emergencies">Emergencies</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <ReportsCard data={AllReportData} />
        </TabsContent>
        <TabsContent value="maintenance">
          <ReportsCard
            data={campusMaintenanceData}
            reportTypeInput="Campus Maintenance Request"
          />
        </TabsContent>
        <TabsContent value="violations">
          <ReportsCard
            data={behavioralData}
            reportTypeInput="Handbook Violation Report"
          />
        </TabsContent>
        <TabsContent value="emergencies">
          <ReportsCard
            data={emergenciesData}
            reportTypeInput="Emergencies Log"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
