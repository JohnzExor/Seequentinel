"use client";

import { useContext } from "react";
import { DataContext } from "./data-provider";
import { MapPin } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useServerAction } from "zsa-react";
import { acceptCallAction, updateEmergencyStatusAction } from "./actions";
import PeerJSComponent from "./peerjs-component";
import { LatLngExpression } from "leaflet";

const EmergencyList = () => {
  const { data, setData, setEndPoint, peer, adminPeerId } =
    useContext(DataContext);
  const { execute } = useServerAction(updateEmergencyStatusAction);
  const acceptCallId = useServerAction(acceptCallAction);

  const acceptCall = async (id: string) => {
    try {
      acceptCallId.execute({ id, recieverId: adminPeerId as string });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const cancelCall = async (emergencyId: string) => {
    try {
      setData((prev) => prev.filter(({ id }) => id !== emergencyId));
      await execute({ id: emergencyId, newStatus: "CANCELED" });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <div className="w-full xl:max-w-[25em] bg-muted rounded-xl p-4 space-y-4">
      <div>
        <span className="text-sm text-primary">
          Peer ID: {adminPeerId ? adminPeerId : "Getting Peer ID..."}
        </span>
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
        {data.map(({ id, location, callStart, peerId, gpsCoordinates }) => (
          <li
            key={id}
            className="bg-background rounded-xl p-4 space-y-2 text-xs "
          >
            <div className=" flex items-start justify-between">
              <span className="text-primary font-medium">
                {formatDistanceToNow(new Date(callStart), {
                  addSuffix: true,
                })}
              </span>
              <button
                onClick={() =>
                  setEndPoint(gpsCoordinates as unknown as LatLngExpression)
                }
                className="underline"
              >
                View Route
              </button>
            </div>
            <div className="flex items-start gap-1 text-sm">
              <MapPin size={20} />
              <span>{location}</span>
            </div>
            <PeerJSComponent
              peer={peer}
              remotePeerId={peerId}
              acceptCall={() => acceptCall(id)}
              cancelCall={() => cancelCall(id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmergencyList;
