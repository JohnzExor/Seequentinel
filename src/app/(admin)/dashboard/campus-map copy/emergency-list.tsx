"use client";

import { useContext, useState } from "react";
import { DataContext } from "./data-provider";
import { MapPin, PhoneCall } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { initializePeer } from "@/lib/peer";
import PeerAudioCall from "./peer-audio-call";
import { useServerAction } from "zsa-react";
import { changeCallStatusAction } from "./actions";

const peer = initializePeer();

const EmergencyList = () => {
  const { data, setEndPoint } = useContext(DataContext);
  const [activeCallId, setActiveCallId] = useState<string | null>(null); // Use a call ID instead of peerId
  const { execute } = useServerAction(changeCallStatusAction);

  const acceptCall = async (id: string, peerId: string) => {
    try {
      // await execute({ id, newStatus: "Connected" });
      setActiveCallId(id); // Set the active call ID
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const cancelCall = async (id: string) => {
    try {
      setActiveCallId(null); // Reset the active call ID
      await execute({ id, newStatus: "Canceled" });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <div className="w-full max-w-[30em] bg-muted rounded-xl p-4 space-y-4">
      <div>
        <h1 className="font-semibold text-2xl">Incoming Calls</h1>
        <p className="text-muted-foreground text-sm">
          List of incoming calls from the users
        </p>
      </div>
      <ul className="space-y-4">
        <div className="text-sm">
          Pending Calls{" "}
          <span className="text-primary font-bold">{data.length}</span>
        </div>
        {data.map(({ id, location, createdAt, peerId, gpsCoordinates }) => {
          const position: [number, number] | null = gpsCoordinates
            ? (gpsCoordinates
                .split(",")
                .map((coord) => parseFloat(coord.trim())) as [number, number])
            : null;

          if (!position || position.length !== 2) return null;

          return (
            <li
              key={id}
              className="bg-background rounded-xl p-4 space-y-2 text-xs "
            >
              <div className=" flex items-start justify-between">
                <span className="text-primary font-medium">
                  {formatDistanceToNow(new Date(createdAt), {
                    addSuffix: true,
                  })}
                </span>
                <button
                  onClick={() => setEndPoint(position)}
                  className="underline"
                >
                  View Route
                </button>
              </div>

              <div className="flex items-start gap-1 text-sm">
                <MapPin size={20} />
                <span>{location}</span>
              </div>

              {activeCallId === id ? ( // Compare activeCallId with the current call ID
                <PeerAudioCall
                  selectedPeerId={peerId as string}
                  peer={peer}
                  endCallStatus={() => cancelCall(id)}
                />
              ) : (
                <div className="flex items-center gap-3">
                  <Button
                    onClick={() => acceptCall(id, peerId as string)}
                    className="rounded-full h-[3em] w-full gap-1 animate-pulse duration-1000"
                  >
                    <PhoneCall className="flex-shrink-0" />
                    Answer Call
                  </Button>
                  <Button
                    onClick={() => cancelCall(id)}
                    variant={"destructive"}
                    className="rounded-full h-[3em] w-[3em]"
                  >
                    <PhoneCall className="flex-shrink-0" />
                  </Button>
                </div>
              )}
              <span className="text-xs text-muted-foreground">
                Peer ID {peerId}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default EmergencyList;
