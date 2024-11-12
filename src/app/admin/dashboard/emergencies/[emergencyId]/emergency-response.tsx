"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { LatLngExpression } from "leaflet";
import { Clock, MapPin } from "lucide-react";
import dynamic from "next/dynamic";
import { useContext } from "react";
import { EmergencyDataContext, responders } from "./emergency-data-provider";
import clsx from "clsx";

const LeafletMap = dynamic(() => import("./leaflet-map"), {
  ssr: false,
  loading: () => <Skeleton className=" h-full w-full" />,
});

const palsuLatlng: LatLngExpression = [9.7769525, 118.7341474];

const EmergencyResponse = () => {
  const { setStartPoint, startPoint } = useContext(EmergencyDataContext);

  const handleOnClick = (coordinates: [number, number]) => {
    setStartPoint(coordinates);
  };

  return (
    <div className="w-full h-full xl:flex flex-col border">
      <LeafletMap posix={palsuLatlng} />
      <div className="h-full w-full p-4 md:p-10 space-y-4">
        <h1 className="text-xl font-bold">Select Responders</h1>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock size={15} />
          <p>
            ON SITE IN <span className="text-primary">LESS THAN 2 MINUTES</span>
          </p>
        </div>
        <ul className="space-y-4">
          {responders.map(
            ({ name, location, timeToArrive, coordinates }, index) => (
              <li
                key={index}
                className={clsx(
                  "border p-4 rounded-xl bg-muted space-y-2 hover:bg-primary/50 duration-500 ease-out",
                  { "border-primary": coordinates === startPoint }
                )}
                onClick={() => handleOnClick(coordinates)}
              >
                <h1 className="font-bold">{name}</h1>
                <div className="flex items-center gap-10 text-xs">
                  <div className="flex items-center gap-1">
                    <Clock size={15} className="text-muted-foreground" />
                    <span className="font-semibold">
                      {timeToArrive} min{"(s)."}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={15} className="text-muted-foreground" />
                    <span className="font-semibold"> {location}</span>
                  </div>
                </div>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default EmergencyResponse;
