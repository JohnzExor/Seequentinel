"use client";

import { Emergencies } from "@prisma/client";
import { useContext } from "react";
import { useServerAction } from "zsa-react";
import { EmergencyContext } from "@/app/home/emergency-data-provider";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { updateEmergencyStatusAction } from "./actions";
import PeerJSComponent from "./peerjs-component";

const EmergencyCall = () => {
  const { data, setData, peer } = useContext(EmergencyContext);

  const { id } = data;

  const changeCallStatus = useServerAction(updateEmergencyStatusAction);

  const cancelCall = async () => {
    try {
      setData({} as Emergencies);
      await changeCallStatus.execute({ id: id, newStatus: "CANCELED" });
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
            Please wait while we&apos;re connecting your call to the emergency
            response team.
          </p>
          <div className=" bg-background rounded-xl p-4 mt-4">
            <PeerJSComponent peer={peer} cancelCall={cancelCall} />
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-2">
          <div>
            <h1 className="text-2xl font-semibold">Call Ended</h1>
            <p className="text-sm text-muted-foreground">
              Your call has ended.
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
