"use client";

import { initializePeer } from "@/lib/peer";
import supabase from "@/lib/storage";
import { Emergencies, Reports } from "@prisma/client";
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
  adminPeerId: string | null;
  data: Emergencies[];
  startPoint: LatLngExpression;
  endPoint: LatLngExpression;
  setStartPoint: Dispatch<SetStateAction<L.LatLngExpression>>;
  setEndPoint: Dispatch<SetStateAction<L.LatLngExpression>>;
};

export const DataContext = createContext<TContext>({
  peer: null,
  adminPeerId: null,
  data: [],
  startPoint: [0, 0],
  endPoint: [0, 0],
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

  useEffect(() => {
    peer.on("open", setPeerId);
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

          setData((prevData) => {
            if (res.status === "CANCELED") {
              return prevData.filter(({ id }) => id !== res.id);
            }
            if (res.status !== "PENDING") {
              return [...prevData, {} as Emergencies];
            }
            const findIndex = data.findIndex((prev) => {
              prev.id === res.id;
            });

            if (findIndex) {
              data[findIndex] === res;
            }

            return [...prevData, res];
          });
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [data, setData]);

  return (
    <DataContext.Provider
      value={{
        peer,
        adminPeerId,
        data,
        startPoint,
        endPoint,
        setStartPoint,
        setEndPoint,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
