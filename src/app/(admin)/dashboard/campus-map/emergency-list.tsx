"use client";

import { Badge } from "@/components/ui/badge";
import { CallStatusEnum, Reports } from "@prisma/client";
import clsx from "clsx";
import { LatLngExpression } from "leaflet";
import { MapPin, PhoneCall, PhoneOff, X } from "lucide-react";
import { useServerAction } from "zsa-react";
import { changeCallStatusAction } from "./action";

const EmergencyList = ({
  closeSidebar,
  setSelectedPosition,
  acceptedCall,
  data,
}: {
  closeSidebar: () => void;
  setSelectedPosition: (position: LatLngExpression) => void;
  acceptedCall: (room: string) => void;

  data: Reports[];
}) => {
  const { execute } = useServerAction(changeCallStatusAction);

  const acceptCall = async (id: string) => {
    try {
      await execute({ id, newStatus: "Connected", room: id });
      acceptedCall(id);
    } catch (error: any) {
      console.error(error.message);
    }
  };
  const cancelCall = async (id: string) => {
    try {
      await execute({ id, newStatus: "Canceled" });
    } catch (error: any) {
      console.error(error.message);
    }
  };
  return (
    <div className="h-screen w-full md:max-w-[500px] fixed z-20 md:right-0 md:p-4">
      <div className=" backdrop-blur-3xl h-full w-full rounded-xl shadow-2xl p-6">
        <div className="flex items-center justify-between">
          <h1 className=" text-2xl font-medium">All Emergencies</h1>
          <button onClick={closeSidebar}>
            <X />
          </button>
        </div>
        <div className="mt-4 space-y-4 overflow-y-auto h-[800px]">
          {data.map(
            (
              { callStatus, location, createdAt, id, gpsCoordinates, callRoom },
              index
            ) => {
              const position: [number, number] | null = gpsCoordinates
                ? (gpsCoordinates
                    .split(",")
                    .map((coord) => parseFloat(coord.trim())) as [
                    number,
                    number
                  ])
                : null;

              if (!position || position.length !== 2) return null; // Handle invalid coordinates
              return (
                <div
                  key={index}
                  onClick={() => setSelectedPosition(position)}
                  className=" border rounded-xl p-4 space-y-2 lg:hover:scale-95 duration-500 ease-in-out cursor-pointer shadow-md bg-background"
                >
                  <div className="flex items-center justify-between">
                    <Badge variant={"destructive"}>HIGH PRIORITY</Badge>
                    <Badge>{callStatus}</Badge>
                  </div>
                  <div className="w-full">
                    <span className="text-xs flex items-start gap-1">
                      <MapPin size={15} />
                      {location}
                    </span>
                    <h1 className=" font-semibold">
                      {createdAt.toLocaleString()}
                    </h1>
                    <p className="text-sm text-muted-foreground">Id: {id}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => acceptCall(id)}
                      className={clsx(
                        "bg-primary text-white w-[3em] h-[3em] rounded-full flex items-center justify-center flex-shrink-0",
                        { "animate-pulse": callStatus === "Pending" }
                      )}
                    >
                      <PhoneCall />
                    </button>
                    <button
                      onClick={() => cancelCall(id)}
                      className="bg-red-500 text-white w-[3em] h-[3em] rounded-full flex items-center justify-center flex-shrink-0"
                    >
                      <PhoneOff />
                    </button>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default EmergencyList;
