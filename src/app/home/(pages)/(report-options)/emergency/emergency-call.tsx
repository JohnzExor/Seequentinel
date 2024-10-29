"use client";

import { Reports } from "@prisma/client";
import { useContext, useEffect, useState } from "react";
import { useServerAction } from "zsa-react";
import { changeCallStatusAction } from "./actions";
import PeerAudioCall from "./peer-audio-call";
import { EmergencyContext } from "@/app/home/emergency-data-provider";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const EmergencyCall = () => {
  const { data, setData } = useContext(EmergencyContext);

  const { id } = data;

  const changeCallStatus = useServerAction(changeCallStatusAction);

  const cancelCall = async () => {
    try {
      setData({} as Reports);
      await changeCallStatus.execute({ id, newStatus: "Canceled" });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <div className="bg-muted rounded-xl p-4 lg:min-w-[25em]">
      {id ? (
        <>
          <h1 className="text-2xl font-semibold">Emergency Call</h1>
          <p className="text-sm text-muted-foreground">
            The emergency team will answer your call
          </p>
          <div className=" bg-background rounded-xl p-4 mt-4">
            <PeerAudioCall endCallStatus={cancelCall} />
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-2">
          <div>
            <h1 className="text-2xl font-semibold">Call Ended</h1>
            <p className="text-sm text-muted-foreground">
              Your call is already ended
            </p>
          </div>
          <Link className={cn(buttonVariants())} href={"/home/"}>
            Go back
          </Link>
        </div>
      )}
    </div>
  );
};

export default EmergencyCall;
