import React from "react";
import { LatLngExpression } from "leaflet";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import EmergencyToggle from "./emergency-toggle";
import EmergencyCall from "./emergency-call";

const LeafletMap = dynamic(() => import("./leaflet-map"), {
  ssr: false,
  loading: () => <Skeleton className=" h-full w-full" />,
});

const palsuLatlng: LatLngExpression = [9.7769525, 118.7341474];

const page = () => {
  return (
    <div className="w-full h-screen relative">
      <EmergencyCall />
      <LeafletMap posix={palsuLatlng} />
    </div>
  );
};

export default page;
