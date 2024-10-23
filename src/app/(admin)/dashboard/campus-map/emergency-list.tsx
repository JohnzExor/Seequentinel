"use client";

import { useContext, useState } from "react";
import { DataContext } from "./data-provider";
import { MapPin, Phone, PhoneMissed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { useServerAction } from "zsa-react";
import { changeCallStatusAction } from "./action";
import CallRoom from "./call-room";

const EmergencyList = () => {
  const [callRoom, setCallRoom] = useState<string>();
  const { data, setEndPoint } = useContext(DataContext);
  const { execute } = useServerAction(changeCallStatusAction);

  const acceptCall = async (id: string) => {
    try {
      await execute({ id, newStatus: "Connected", room: id });
      setCallRoom(id);
    } catch (error: any) {
      console.error(error.message);
    }
  };
  const cancelCall = async (id: string) => {
    try {
      await execute({ id, newStatus: "Canceled" });
      setCallRoom("");
    } catch (error: any) {
      console.error(error.message);
    }
  };
  return (
    <>
      {callRoom ? (
        <div className="bottom-0 fixed z-20 p-4 w-full md:max-w-[25em] lg:max-w-[40em]">
          <div className=" bg-background w-full p-3 rounded-xl shadow-xl md:hover:scale-105 duration-500 ease-in-out">
            <div className="w-full">
              <CallRoom
                room={callRoom}
                name={"Emergency Team"}
                onLeave={() => cancelCall(callRoom)}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="z-20 fixed p-4 right-0 w-full max-w-[30em]">
          <div className="bg-background p-3 rounded-xl shadow-xl">
            <h1 className="text-xl font-medium">Emergencies</h1>
            <p className="text-muted-foreground text-sm">
              List of users that has been calling
            </p>
            <div className=" bg-muted rounded-xl p-3 mt-4 space-y-2">
              <div className="text-sm pl-2">
                Pending Calls
                <span className="font-bold pl-2 text-primary">
                  {data.length}
                </span>
              </div>
              {data.map(
                (
                  {
                    id,
                    createdAt,
                    location,
                    callStatus,
                    gpsCoordinates,
                    userId,
                  },
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

                  if (!position || position.length !== 2) return null;
                  return (
                    <div
                      onClick={() => setEndPoint(position)}
                      key={index}
                      className=" bg-background rounded-xl p-4 space-y-2 md:hover:scale-105 duration-500 ease-in-out"
                    >
                      <div className="text-sm">
                        <div className="text-muted-foreground flex items-start gap-1">
                          <MapPin size={15} />
                          <span>{location}</span>
                        </div>
                        <h1>
                          {formatDistanceToNow(new Date(createdAt), {
                            addSuffix: true,
                          })}
                        </h1>
                      </div>

                      <div className="flex items-center w-full gap-2">
                        <Button
                          onClick={() => acceptCall(id)}
                          className=" rounded-full h-[3em] w-full space-x-2 animate-pulse duration-500"
                        >
                          <Phone size={25} className="flex-shrink-0" />
                          <span>Answer Call</span>
                        </Button>
                        <Button
                          onClick={() => cancelCall(id)}
                          variant={"destructive"}
                          className=" rounded-full h-[3em] w-[3em]"
                        >
                          <PhoneMissed size={25} className="flex-shrink-0" />
                        </Button>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmergencyList;
