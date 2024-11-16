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
import EmergencyToggle from "./emergency-toggle";

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
    <div className=" absolute z-30 bottom-0 flex justify-center w-full md:p-4">
      <div className="bg-background w-full md:max-w-[30em] pb-6 md:pb-2 px-4 flex flex-col items-center justify-center rounded-t-xl md:rounded-xl shadow-xl space-y-2">
        <EmergencyToggle />
        {activeEmergency?.id ? (
          <>
            {peer ? (
              <PeerJSComponent peer={peer} cancelCall={cancelCall} />
            ) : null}
          </>
        ) : (
          <>
            <div>
              <h1 className="text-2xl font-semibold">Call Ended</h1>
              <p className="text-sm text-muted-foreground">
                Your call has ended.
              </p>
            </div>
            <Link className={cn(buttonVariants(), "w-full")} href={"/home/"}>
              Go back
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default EmergencyCall;
