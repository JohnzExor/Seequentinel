"use client";

import { Button } from "@/components/ui/button";
import { Reports } from "@prisma/client";
import { useContext, useState } from "react";
import CallRoom from "./call-room";
import { useServerAction } from "zsa-react";
import { changeCallStatusAction, emergencyCallAction } from "./actions";
import { useSession } from "next-auth/react";
import { PhoneCall, PhoneMissed } from "lucide-react";
import { DataContext } from "./data-provider";

const EmergencyCall = () => {
  const session = useSession();
  const { data, setData } = useContext(DataContext);
  const [tapCounter, setTapCounter] = useState<number>(0);

  const { id, callRoom, userId } = data;

  const emergency = useServerAction(emergencyCallAction);
  const changeCallStatus = useServerAction(changeCallStatusAction);

  const postEmergency = async () => {
    try {
      const res = await emergency.execute({
        reportType: "Emergencies",
        problemType: "Emergency",
        callStatus: "Pending",
        location: "none",
        gpsCoordinates: "none",
        userId: session.data?.user.id,
        attachments: [],
      });
      setData(res[0] as Reports);
      setTapCounter(0);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const cancelCall = async () => {
    try {
      setData({} as Reports);
      await changeCallStatus.execute({ id, newStatus: "Canceled" });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleTapCounter = () => {
    if (tapCounter <= 1) {
      return setTapCounter(tapCounter + 1);
    }
    postEmergency();
  };
  return (
    <>
      {!id ? (
        <div className="h-[17em] flex justify-center items-center relative">
          <div className="flex flex-col justify-center items-center">
            <div className=" absolute rounded-full bg-red-100 h-[15em] w-[15em] animate-pulse shadow-xl" />
            <div className=" absolute rounded-full bg-red-300 h-[12em] w-[12em] animate-pulse shadow-xl" />
            <button
              onClick={handleTapCounter}
              disabled={emergency.isPending}
              className="flex flex-col justify-center items-center rounded-full bg-red-500 text-white h-[10em] w-[10em] z-20 shadow-xl hover:scale-105 duration-500 ease-out"
            >
              <span className="text-5xl font-bold">
                {tapCounter > 0 ? (
                  emergency.isPending ? (
                    <PhoneCall size={80} className="animate-pulse" />
                  ) : (
                    tapCounter
                  )
                ) : (
                  "SOS"
                )}
              </span>
              <span className="text-sm">tap 3 times</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="z-20 p-4 w-full md:max-w-[25em] lg:max-w-[40em]">
            <div className=" bg-background w-full p-3 rounded-xl shadow-xl md:hover:scale-105 duration-500 ease-in-out">
              {callRoom && userId ? (
                <div className="w-full">
                  <CallRoom
                    room={callRoom}
                    name={userId}
                    onLeave={cancelCall}
                  />
                </div>
              ) : (
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h1 className=" font-semibold">Pending</h1>
                    <p className="text-sm text-muted-foreground">
                      The emergency call is in the queue and has not yet been
                      connected.
                    </p>
                  </div>
                  <Button
                    onClick={cancelCall}
                    variant={"destructive"}
                    className=" rounded-full p-4 h-12 w-12"
                  >
                    <PhoneMissed className="shrink-0" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmergencyCall;
