"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Book, ConstructionIcon } from "lucide-react";
import ReportsCard from "./reports-card";
import { Reports } from "@prisma/client";

const ReportsTab = ({
  data,
}: {
  data: { reports: Reports[]; cmr: Reports[]; hvr: Reports[] };
}) => {
  const { reports, cmr, hvr } = data;

  return (
    <Tabs defaultValue="all" className="w-full">
      <div className=" overflow-x-auto pb-3 -mx-4 md:-mx-0">
        <TabsList>
          <TabsTrigger value="all">
            All Reports <Badge className="ml-1">{reports.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="maintenance" className="flex items-center gap-1">
            <ConstructionIcon size={15} />
            <span>Campus Maintenance</span>
            <Badge>{cmr.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="violations" className="flex items-center gap-1">
            <Book size={15} />
            <span>Handbook Violations</span>
            <Badge>{hvr.length}</Badge>
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="all">
        <ReportsCard data={reports} />
      </TabsContent>
      <TabsContent value="maintenance">
        <ReportsCard data={cmr} />
      </TabsContent>
      <TabsContent value="violations">
        <ReportsCard data={hvr} />
      </TabsContent>
    </Tabs>
  );
};

export default ReportsTab;
