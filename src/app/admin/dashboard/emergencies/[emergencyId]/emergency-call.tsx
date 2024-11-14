"use client";

import { useContext } from "react";
import PeerJSComponent from "./peerjs-component";
import { AdminDataContext } from "../../data-provider";
import { useServerAction } from "zsa-react";
import { acceptCallAction, updateEmergencyStatusAction } from "./actions";
import { EmergencyDataContext } from "./emergency-data-provider";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

const EmergencyCall = () => {
  const { peer, adminPeerId } = useContext(AdminDataContext);
  const { setEndPoint, data } = useContext(EmergencyDataContext);
  const cancelCallAction = useServerAction(updateEmergencyStatusAction);
  const acceptCallId = useServerAction(acceptCallAction);

  const { peerId, id } = data;

  const acceptCall = async (id: string) => {
    try {
      acceptCallId.execute({ id, recieverId: adminPeerId as string });
    } catch (error) {
      console.error(error);
    }
  };

  const cancelCall = async (emergencyId: string) => {
    try {
      // setData((prev) => prev.filter(({ id }) => id !== emergencyId));
      setEndPoint([0, 0]);
      await cancelCallAction.execute({
        id: emergencyId,
        newStatus: "CANCELED",
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-full border p-4 md:p-10 space-y-7">
      <Link
        href={"/admin/dashboard/emergencies"}
        className="flex items-center gap-1 text-muted-foreground text-sm hover:underline duration-500 ease-out"
      >
        <ChevronLeft />
        <span>Back to Emergency List</span>
      </Link>
      <div>
        <Badge>PENDING</Badge>
        <h1 className="text-2xl font-bold">Emergency Call</h1>
        <span></span>
      </div>
      <PeerJSComponent
        peer={peer}
        remotePeerId={peerId}
        acceptCall={() => acceptCall(id)}
        cancelCall={() => cancelCall(id)}
      />
    </div>
  );
};

export default EmergencyCall;
