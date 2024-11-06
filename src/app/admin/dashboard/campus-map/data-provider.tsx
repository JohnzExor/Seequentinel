"use client";

import { initializePeer } from "@/lib/peer";
import supabase from "@/lib/storage";
import { Emergencies, EmergencyStatusEnum } from "@prisma/client";
import { LatLngExpression } from "leaflet";
import Peer from "peerjs";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

type TContext = {
  peer: Peer | null;
  peerError: string | null;
  adminPeerId: string | null;
  data: Emergencies[];
  startPoint: LatLngExpression;
  endPoint: LatLngExpression;
  setData: Dispatch<SetStateAction<Emergencies[]>>;
  setStartPoint: Dispatch<SetStateAction<L.LatLngExpression>>;
  setEndPoint: Dispatch<SetStateAction<L.LatLngExpression>>;
};

export const DataContext = createContext<TContext>({
  peer: null,
  peerError: null,
  adminPeerId: null,
  data: [],
  startPoint: [0, 0],
  endPoint: [0, 0],
  setData: () => {},
  setStartPoint: () => {},
  setEndPoint: () => {},
});

const peer = initializePeer();

export const DataProvider = ({
  emergencyData,
  children,
}: {
  emergencyData: Emergencies[];
  children: ReactNode;
}) => {
  const [data, setData] = useState(emergencyData);
  const [adminPeerId, setPeerId] = useState<string | null>(null);
  const [startPoint, setStartPoint] = useState<LatLngExpression>([0, 0]);
  const [endPoint, setEndPoint] = useState<LatLngExpression>([0, 0]);
  const [peerError, setPeerError] = useState<string | null>(null);

  useEffect(() => {
    peer.on("open", setPeerId);
    peer.on("error", () => setPeerError("Error getting peer id"));

    const channel = supabase
      .channel("emergency-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "Emergencies",
        },
        async (payload) => {
          const res = payload.new as Emergencies;

          // Validate that res.status is a valid EmergencyStatusEnum
          if (!Object.values(EmergencyStatusEnum).includes(res.status)) {
            console.error(`Invalid status received: ${res.status}`);
            return; // Skip processing this entry
          }

          setData((prevData) => {
            switch (res.status) {
              case EmergencyStatusEnum.CANCELED:
                // Remove the item if its status is "CANCELED"
                return prevData.filter(({ id }) => id !== res.id);

              case EmergencyStatusEnum.COMPLETED:
              case EmergencyStatusEnum.FAILED:
              case EmergencyStatusEnum.ACTIVE:
                // Update or add the item if its status is "ACTIVE", "COMPLETED", or "FAILED"
                return prevData.map((prev) => {
                  if (prev.id === res.id) {
                    return { ...prev, ...res }; // Update the existing entry
                  }
                  return prev; // Return the existing entry as is
                });

              case EmergencyStatusEnum.PENDING:
                // Check if the item already exists in the array
                const existingItem = prevData.find(
                  (prev) => prev.id === res.id
                );
                if (existingItem) {
                  // Update if it exists
                  return prevData.map((prev) => {
                    if (prev.id === res.id) {
                      return { ...prev, ...res }; // Update the existing entry
                    }
                    return prev; // Return the existing entry as is
                  });
                } else {
                  // If it doesn't exist, add the new entry
                  return [...prevData, res];
                }

              default:
                console.error(`Unhandled status: ${res.status}`);
                return prevData; // Default return if unhandled
            }
          });

          setEndPoint(res.gpsCoordinates as unknown as LatLngExpression);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [setData]);

  return (
    <DataContext.Provider
      value={{
        peer,
        peerError,
        adminPeerId,
        data,
        startPoint,
        endPoint,
        setData,
        setStartPoint,
        setEndPoint,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
