"use client";

import { Button } from "@/components/ui/button";
import { LatLngExpression } from "leaflet";
import { Navigation, X } from "lucide-react";
import { SetTargetLocation } from "./data";

const ViewEmergencyDetails = ({
  closeSidebar,
}: {
  closeSidebar: () => void;
}) => {
  return (
    <div className="h-screen w-[500px] fixed z-20 right-0 p-4">
      <div className=" bg-white h-full w-full rounded-xl shadow-2xl p-6">
        <div className="flex items-center justify-between">
          <h1 className=" text-2xl font-medium">Emergency Details</h1>
          <button onClick={closeSidebar}>
            <X />
          </button>
        </div>
        <div>
          <Button
            onClick={() => SetTargetLocation([9.778374, 118.733945])}
            className="flex items-center gap-1"
          >
            <Navigation /> <span>Go to this location</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewEmergencyDetails;
