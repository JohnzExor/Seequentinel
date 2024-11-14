"use client";

import { Book, ConstructionIcon } from "lucide-react";
import React from "react";
import EmergenciesList from "./emergencies-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Emergencies } from "@prisma/client";

const EmergenciesTab = ({
  data,
}: {
  data: {
    emergencies: Emergencies[];
    pendings: Emergencies[];
    active: Emergencies[];
    completed: Emergencies[];
  };
}) => {
  const { emergencies, pendings, active, completed } = data;

  return (
    <div className="w-full xl:max-w-[40em] max-h-screen overflow-y-auto p-4 xl:p-10 space-y-10">
      <h1 className="font-bold text-2xl">Emergencies</h1>
      <div className="flex justify-evenly items-center">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 text-sm">
            <Book size={15} className="text-primary" />
            <span className="text-muted-foreground">Pendings</span>
          </div>
          <span className="font-bold text-2xl">{pendings.length}</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 text-sm">
            <Book size={15} className="text-primary" />
            <span className="text-muted-foreground">Proceedings</span>
          </div>
          <span className="font-bold text-2xl">{active.length}</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 text-sm">
            <Book size={15} className="text-primary" />
            <span className="text-muted-foreground">Completed</span>
          </div>
          <span className="font-bold text-2xl">{completed.length}</span>
        </div>
      </div>
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-[20em] overflow-x-auto lg:w-full">
          <TabsTrigger value="all" className="w-full">
            ALL
          </TabsTrigger>
          <TabsTrigger
            value="pendings"
            className="flex items-center gap-1 w-full"
          >
            <ConstructionIcon size={15} />
            <span>PENDINGS</span>
          </TabsTrigger>
          <TabsTrigger
            value="proceedings"
            className="flex items-center gap-1 w-full"
          >
            <Book size={15} />
            <span>PROCEEDING</span>
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="flex items-center gap-1 w-full"
          >
            <Book size={15} />
            <span>COMPLETED</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <EmergenciesList emergencies={emergencies} />
        </TabsContent>
        <TabsContent value="pendings">
          <EmergenciesList emergencies={pendings} />
        </TabsContent>
        <TabsContent value="proceedings">
          <EmergenciesList emergencies={active} />
        </TabsContent>
        <TabsContent value="completed">
          <EmergenciesList emergencies={completed} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmergenciesTab;
