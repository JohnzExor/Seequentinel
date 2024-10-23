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
        <div className=" h-screen w-full z-20 flex flex-col gap-4 items-center justify-center fixed bg-white dark:bg-black dark:bg-opacity-80 bg-opacity-80 backdrop-blur-md">
          <div className="bg-background max-w-[30em] rounded-xl p-4 shadow-lg">
            <h1 className=" text-xl font-medium">Are you in an emergency?</h1>
            <p className=" text-muted-foreground text-sm">
              Press the SOS button, your live location will be shared with the
              nearest help centre and your emergency contacts
            </p>
            <div className=" rounded-xl bg-muted mt-4 h-[20em] flex items-center justify-center overflow-hidden">
              <div className=" rounded-full p-6 bg-red-200 absolute w-[20em] h-[20em] animate-ping" />
              <div className=" rounded-full p-6 bg-red-200 shadow-xl cursor-pointer w-[18em] h-[18em] absolute animate-pulse" />
              <button
                onClick={handleTapCounter}
                disabled={emergency.isPending}
                className=" rounded-full w-[15em] h-[15em] bg-red-500 disabled:bg-red-300 text-white z-20 hover:scale-105 duration-500 ease-in-out flex flex-col justify-center items-center"
              >
                <h1 className="font-bold text-7xl w-fit">
                  {tapCounter > 0 ? (
                    emergency.isPending ? (
                      <PhoneCall size={80} className="animate-pulse" />
                    ) : (
                      tapCounter
                    )
                  ) : (
                    "SOS"
                  )}
                </h1>
                <span className="text-sm font-normal">Tap 3 times</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bottom-0 fixed z-20 p-4 w-full md:max-w-[25em] lg:max-w-[40em]">
          <div className=" bg-background w-full p-3 rounded-xl shadow-xl md:hover:scale-105 duration-500 ease-in-out">
            {callRoom && userId ? (
              <div className="w-full">
                <CallRoom room={callRoom} name={userId} onLeave={cancelCall} />
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
      )}
    </>
  );
};

export default EmergencyCall;
