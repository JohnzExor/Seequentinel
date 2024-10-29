"use client";

import { Button } from "@/components/ui/button";
import { Reports } from "@prisma/client";
import { useContext, useEffect, useState } from "react";
import { useServerAction } from "zsa-react";
import { changeCallStatusAction, emergencyCallAction } from "./actions";
import { useSession } from "next-auth/react";
import { PhoneCall, PhoneMissed } from "lucide-react";
import { DataContext } from "./data-provider";
import { initializePeer } from "@/lib/peer";
import PeerAudioCall from "./peer-audio-call";

const peer = initializePeer();

const EmergencyCall = () => {
  const session = useSession();
  const { data, setData } = useContext(DataContext);
  const [peerId, setPeerId] = useState<string>();
  const [tapCounter, setTapCounter] = useState<number>(0);

  const { id } = data;

  const emergency = useServerAction(emergencyCallAction);
  const changeCallStatus = useServerAction(changeCallStatusAction);

  useEffect(() => {
    peer.on("open", setPeerId);
  }, []);

  const postEmergency = async () => {
    try {
      const res = await emergency.execute({
        reportType: "Emergencies",
        problemType: "Emergency",
        callStatus: "Pending",
        location: "none",
        gpsCoordinates: "none",
        peerId: peerId,
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
    <div className="bg-muted rounded-xl p-4">
      <h1 className="text-2xl font-semibold">Emergency Call</h1>
      <p className="text-sm text-muted-foreground">
        The emergency team will answer your call
      </p>
      <div className=" bg-background rounded-xl p-4 mt-4">
        {!id ? (
          <div className="h-[17em] flex justify-center items-center relative">
            <div className="flex flex-col justify-center items-center">
              <div className=" absolute rounded-full bg-red-100 h-[15em] w-[15em] animate-pulse shadow-xl" />
              <div className=" absolute rounded-full bg-red-300 h-[12em] w-[12em] animate-pulse shadow-xl" />
              <button
                onClick={handleTapCounter}
                disabled={emergency.isPending || !peerId}
                className="flex flex-col justify-center items-center rounded-full bg-red-500 disabled:bg-red-300  text-white h-[10em] w-[10em] z-20 shadow-xl hover:scale-105 duration-500 ease-out"
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
          <>
            <PeerAudioCall peer={peer} endCallStatus={cancelCall} />
            <span className="text-xs text-muted-foreground pl-4">
              Peer ID: {peerId}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default EmergencyCall;
