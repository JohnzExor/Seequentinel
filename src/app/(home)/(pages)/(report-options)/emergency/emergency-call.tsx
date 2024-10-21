"use client";

import { useSession } from "next-auth/react";
import CallRoom from "./call-room";
import { CallStatusEnum, Reports } from "@prisma/client";
import { useState, useEffect } from "react";

import "@livekit/components-styles";
import { Badge } from "@/components/ui/badge";
import { useServerAction } from "zsa-react";
import emergencyCallAction, { changeCallStatusAction } from "./actions";
import supabase from "@/lib/storage";
import CallStatusIdentifier from "./call-status-identifier";
import { PhoneMissed } from "lucide-react";
import { Button } from "@/components/ui/button";

const fetchLocationName = async (lat: number, lon: number) => {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
  );

  const { display_name } = await res.json();

  return display_name;
};

const EmergencyCall = ({
  status,
  callData,
}: {
  status: CallStatusEnum;
  callData: Reports;
}) => {
  const [callStatus, setCallStatus] = useState<CallStatusEnum>(status);
  const [tapCount, setTapCount] = useState<number>(0);
  const [locationName, setLocationName] = useState<string>();
  const [coordinates, setCoordinates] = useState<string>();
  const [data, setData] = useState(callData);

  const session = useSession();

  const { execute, isError, error, isPending } =
    useServerAction(emergencyCallAction);

  const cancelCall = useServerAction(changeCallStatusAction);

  const setCount = async () => {
    setTapCount(tapCount + 1);
    if (tapCount > 1 && session.data?.user && locationName) {
      setCallStatus("Pending");
      setTapCount(0);

      try {
        const res = await execute({
          reportType: "Emergencies",
          problemType: "Emergency",
          callStatus: "Pending",
          location: locationName,
          gpsCoordinates: coordinates,
          userId: session.data.user.id,
          attachments: [],
        });
        setData(res[0] as Reports);
      } catch (error: any) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (data.callRoom) setCallStatus("Connected");
    if ("geolocation" in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        setCoordinates(`${latitude},${longitude}`);
        fetchLocationName(latitude, longitude).then((name) =>
          setLocationName(name)
        );
      });
    }
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel("emergency-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "Reports",
        },
        async (payload) => {
          const res = payload.new as Reports;
          if (res.id !== data.id) return;
          if (res.callRoom) {
            setCallStatus("Connected");
            return setData(res);
          }
          if (res.callStatus === "Canceled") {
            setData({} as Reports);
            setCallStatus("Canceled");
            setTimeout(() => {
              setCallStatus("None");
            }, 2000);
          }
          setData(res);
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [data, setData]);

  const handleCancelCall = async () => {
    try {
      setData({} as Reports);
      setCallStatus("Canceled");
      setTimeout(() => {
        setCallStatus("None");
      }, 2000);
      await cancelCall.execute({ id: callData.id, newStatus: "Canceled" });
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <>
      {callStatus === "None" ? (
        <div className=" h-screen w-full z-20 flex flex-col gap-4 items-center justify-center fixed backdrop-blur-lg">
          <div className=" bg-red-300 w-80 h-80 rounded-full flex items-center justify-center p-10 cursor-pointer shadow-2xl">
            <button
              onClick={setCount}
              className=" bg-red-500 hover:bg-red-400 duration-500 ease-in-out w-full h-full rounded-full flex flex-col items-center justify-center text-white hover:scale-95"
            >
              <h1 className=" text-7xl font-bold">
                {tapCount > 0 ? tapCount : "SOS"}
              </h1>
              <p className="text-sm">Tap 3 times</p>
            </button>
          </div>
        </div>
      ) : (
        <div className=" bottom-0 w-full md:max-w-[25em] lg:max-w-[40em] fixed z-20 p-3 space-y-2 lg:hover:scale-105 duration-500 ease-in-out cursor-pointer">
          <Badge variant={"destructive"}>HIGH PRIORITY</Badge>
          <div className="bg-background w-full h-full rounded-xl shadow-2xl flex flex-col items-center gap-2 p-3">
            <div className="flex items-center justify-between w-full">
              <CallStatusIdentifier
                status={callStatus}
                location={locationName}
              />
              <Button
                onClick={handleCancelCall}
                variant={"destructive"}
                className=" rounded-full p-4 h-12 w-12"
              >
                <PhoneMissed className="shrink-0" />
              </Button>
            </div>
            {data.callRoom ? (
              <div className=" bg-black text-white w-full rounded-xl">
                <CallRoom
                  room={data.callRoom as string}
                  name={data.id}
                  onLeave={handleCancelCall}
                />
              </div>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

export default EmergencyCall;
