import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReportsCard from "./reports-card";

import { Badge } from "@/components/ui/badge";
import { Book, ConstructionIcon } from "lucide-react";
import { TReportProgressData } from "./page";

const ReportsTab = ({ reports }: { reports: TReportProgressData }) => {
  const {
    totalReports,
    totalCampusMaintenance,
    totalHandbookViolation,
    allReports,
    maintenanceReports,
    handbookReports,
  } = reports;

  return (
    <Tabs defaultValue="all" className="w-full">
      <div className=" overflow-x-auto pb-3 -mx-4 md:-mx-0">
        <TabsList>
          <TabsTrigger value="all">
            All Reports <Badge className="ml-1">{totalReports}</Badge>
          </TabsTrigger>
          <TabsTrigger value="maintenance" className="flex items-center gap-1">
            <ConstructionIcon size={15} />
            <span>Campus Maintenance</span>
            <Badge>{totalCampusMaintenance}</Badge>
          </TabsTrigger>
          <TabsTrigger value="violations" className="flex items-center gap-1">
            <Book size={15} />
            <span>Handbook Violations</span>
            <Badge>{totalHandbookViolation}</Badge>
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
        <ReportsCard data={handbookReports} />
      </TabsContent>
    </Tabs>
  );
};

export default ReportsTab;
