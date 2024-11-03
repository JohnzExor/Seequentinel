"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReportsCard from "./reports-card";

import { Book, ConstructionIcon, Siren } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { z } from "zod";
import { reportTypeEnum } from "@/lib/zod";
import { Reports } from "@prisma/client";

const titles = {
  CampusMaintenance: "Campus Maintenance Request",
  Emergencies: "Emergencies",
  HandbookViolation: "Handbook Violation Report",
};

const icons = {
  CampusMaintenance: ConstructionIcon,
  Emergencies: Siren,
  HandbookViolation: Book,
};

const ReportsTab = ({ reports }: { reports: Reports[] }) => {
  const MapReports = (filter?: z.infer<typeof reportTypeEnum>) =>
    reports
      .filter(({ reportType }) => !filter || reportType === filter)
      .map(({ id, reportType, createdAt, status, problemType }) => {
        return {
          reportType: titles[reportType],
          problemType: problemType,
          status: status,
          createdAt: createdAt,
          icon: icons[reportType],
          path: `/home/report-progress/${id}`,
        };
      })
      .reverse();

  const allReports = MapReports();
  const maintenanceReports = MapReports("CampusMaintenance");
  const violationReports = MapReports("HandbookViolation");
  const emergencyReports = MapReports("Emergencies");

  return (
    <Tabs defaultValue="all" className="w-full">
      <div className=" overflow-x-auto pb-3 -mx-4 md:-mx-0">
        <TabsList>
          <TabsTrigger value="all">
            All Reports <Badge className="ml-1">{allReports.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="maintenance" className="flex items-center gap-1">
            <ConstructionIcon size={15} />
            <span>Campus Maintenance</span>
            <Badge>{maintenanceReports.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="violations" className="flex items-center gap-1">
            <Book size={15} />
            <span>Handbook Violations</span>
            <Badge>{violationReports.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="emergencies" className="flex items-center gap-1">
            <Siren size={15} />
            <span>Emergencies</span>
            <Badge>{emergencyReports.length}</Badge>
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="all">
        <ReportsCard data={allReports} />
      </TabsContent>
      <TabsContent value="maintenance">
        <ReportsCard data={maintenanceReports} />
      </TabsContent>
      <TabsContent value="violations">
        <ReportsCard data={violationReports} />
      </TabsContent>
      <TabsContent value="emergencies">
        <ReportsCard data={emergencyReports} />
      </TabsContent>
    </Tabs>
  );
};

export default ReportsTab;
