"use client";
import { Badge } from "@/components/ui/badge";
import { CallStatusEnum, Reports } from "@prisma/client";
import clsx from "clsx";
import { LoaderCircle, MapPin, PhoneCall, PhoneOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useServerAction } from "zsa-react";
import emergencyCallAction, { cancelCallAction } from "./actions";
import { useSession } from "next-auth/react";

const callStatusState: { name: CallStatusEnum; description: string }[] = [
  {
    name: "Pending",
    description:
      "The emergency call is in the queue and has not yet been connected.",
  },
  {
    name: "Connected",
    description:
      "The emergency call has been successfully connected with the authorities.",
  },
  {
    name: "Disconnected",
    description:
      "The emergency call was connected but has been disconnected or dropped.",
  },
  {
    name: "Failed",
    description:
      "The emergency call failed to connect, possibly due to network issues.",
  },
  {
    name: "Canceled",
    description:
      "The emergency call was canceled before it could connect with the authorities.",
  },
];

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
  const [tapCount, setTapCount] = useState<number>(0);
  const [callStatus, setCallStatus] = useState<CallStatusEnum>(status);
  const [locationName, setLocationName] = useState<string>();
  const [coordinates, setCoordinates] = useState<string>();
  const { data } = useSession();

  const { execute, isError, error, isPending } =
    useServerAction(emergencyCallAction);

  const cancelCall = useServerAction(cancelCallAction);

  const setCount = async () => {
    setTapCount(tapCount + 1);
    if (tapCount > 1 && data?.user && locationName) {
      setCallStatus("Pending");
      setTapCount(0);

      try {
        await execute({
          reportType: "Emergencies",
          problemType: "Emergency",
          callStatus: "Pending",
          location: locationName,
          gpsCoordinates: coordinates,
          userId: data.user.id,
          attachments: [],
        });
      } catch (error: any) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
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

  const handleCancelCall = async () => {
    try {
      await cancelCall.execute({ id: callData.id, newStatus: "Canceled" });
      setCallStatus("Canceled");
    } catch (error: any) {
      console.error(error);
    }
    setTimeout(() => {
      setCallStatus("None");
    }, 2000);
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
        <div className=" bottom-0 w-full  max-w-[40em] fixed z-20 p-3 space-y-2 hover:scale-105 duration-500 ease-in-out cursor-pointer">
          <Badge variant={"destructive"}>HIGH PRIORITY</Badge>
          <div className="bg-background w-full h-full rounded-xl shadow-2xl flex items-center justify-between gap-2 p-3">
            <div
              className={clsx(
                "bg-primary text-white w-[3em] h-[3em] rounded-full flex items-center justify-center flex-shrink-0",
                { "animate-pulse": callStatus === "Pending" }
              )}
            >
              <PhoneCall />
            </div>
            {callStatusState.map(({ name, description }, index) =>
              name === callStatus ? (
                <div key={index} className="w-full">
                  {locationName ? (
                    <span className="text-xs flex items-start gap-1">
                      <MapPin size={15} />
                      {locationName}
                    </span>
                  ) : null}
                  <h1 className=" font-semibold">{name}</h1>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </div>
              ) : null
            )}
            <button
              onClick={handleCancelCall}
              className="bg-red-500 text-white w-[3em] h-[3em] rounded-full flex items-center justify-center flex-shrink-0"
            >
              <PhoneOff />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EmergencyCall;
