"use client";

import { Emergencies } from "@prisma/client";
import { useContext } from "react";
import { useServerAction } from "zsa-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { updateEmergencyStatusAction } from "./actions";
import PeerJSComponent from "./peerjs-component";
import { UserDataContext } from "../data-provider";

const EmergencyCall = () => {
  const { activeEmergency, setActiveEmergency, peer } =
    useContext(UserDataContext);

  const changeCallStatus = useServerAction(updateEmergencyStatusAction);

  const cancelCall = async () => {
    try {
      if (!setActiveEmergency || !activeEmergency) return;
      setActiveEmergency({} as Emergencies);
      await changeCallStatus.execute({
        id: activeEmergency.id,
        newStatus: "CANCELED",
      });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <div className="bg-muted rounded-xl p-4 w-full">
      {activeEmergency?.id ? (
        <>
          <h1 className="text-2xl font-semibold">Emergency Call</h1>
          <p className="text-sm text-muted-foreground">
            Please wait while we&apos;re connecting your call to the emergency
            response team.
          </p>
          {peer ? (
            <div className=" bg-background rounded-xl p-4 mt-4">
              <PeerJSComponent peer={peer} cancelCall={cancelCall} />
            </div>
          ) : null}
        </>
      ) : (
        <div className="flex flex-col gap-2">
          <div>
            <h1 className="text-2xl font-semibold">Call Ended</h1>
            <p className="text-sm text-muted-foreground">
              Your call has ended.
            </p>
          </div>
          <Link className={cn(buttonVariants())} href={"/user/home/"}>
            Go back
          </Link>
        </div>
      )}
    </div>
  );
};

export default EmergencyCall;
