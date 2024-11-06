"use client";

import { useContext, useEffect, useState } from "react";
import { DataContext } from "./data-provider";
import { LoaderCircle, Locate, MapPin } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useServerAction } from "zsa-react";
import { acceptCallAction, updateEmergencyStatusAction } from "./actions";
import PeerJSComponent from "./peerjs-component";
import { LatLngExpression } from "leaflet";
import { Decimal } from "@prisma/client/runtime/library";

const fetchLocationName = async (coordinates: Decimal[]) => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coordinates[0]}&lon=${coordinates[1]}`
    );

    const { display_name } = await res.json();

    return display_name;
  } catch (error: any) {
    console.error(error.message);
  }
};

const EmergencyList = () => {
  const { data, setData, setEndPoint, peer, adminPeerId } =
    useContext(DataContext);
  const { execute } = useServerAction(updateEmergencyStatusAction);
  const acceptCallId = useServerAction(acceptCallAction);

  const [locations, setLocations] = useState<{ [key: string]: string }>({});

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
      setEndPoint([0, 0]);
      await execute({ id: emergencyId, newStatus: "CANCELED" });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const fetchLocations = async () => {
      const locationPromises = data.map(async ({ id, gpsCoordinates }) => {
        if (gpsCoordinates) {
          const locationName = await fetchLocationName(gpsCoordinates);
          return { id, locationName };
        }
        return { id, locationName: "No GPS data" };
      });

      const resolvedLocations = await Promise.all(locationPromises);
      const locationMap = resolvedLocations.reduce(
        (acc, { id, locationName }) => ({ ...acc, [id]: locationName }),
        {}
      );
      setLocations(locationMap);
    };

    if (data.length) {
      fetchLocations();
    }
  }, [data]);

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
        {data.map(({ id, callStart, peerId, gpsCoordinates }) => (
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
            {locations[id] ? (
              <div className="flex gap-1 text-sm">
                <MapPin size={20} />
                <span>{locations[id]}</span>
              </div>
            ) : (
              <div className="flex gap-1 animate-pulse text-sm">
                <Locate size={20} />
                <span>Getting location..</span>
              </div>
            )}
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
