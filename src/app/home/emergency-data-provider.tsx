"use client";

import { initializePeer } from "@/lib/peer";
import Peer from "peerjs";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Emergencies } from "@prisma/client";
import supabase from "@/lib/storage";

type TContext = {
  data: Emergencies;
  setData: Dispatch<SetStateAction<Emergencies>>;
  peer: Peer;
  peerId: string | undefined;
  location: string | undefined;
  setLocation: React.Dispatch<React.SetStateAction<string | undefined>>;
  gpsCoordinates: [number, number] | null;
  setGpsCoordinates: React.Dispatch<
    React.SetStateAction<[number, number] | null>
  >;
};

export const EmergencyContext = createContext<TContext>({
  data: {} as Emergencies,
  setData: () => {},
  peer: {} as Peer,
  peerId: undefined,
  location: undefined,
  setLocation: () => {},
  gpsCoordinates: null,
  setGpsCoordinates: () => {},
});

const peer = initializePeer();

const EmergencyDataProvider = ({ children }: { children: ReactNode }) => {
  const [peerId, setPeerId] = useState<string>();
  const [data, setData] = useState<Emergencies>({} as Emergencies);
  const [location, setLocation] = useState<string>();
  const [gpsCoordinates, setGpscoordinates] = useState<[number, number] | null>(
    null
  );
  const { id } = data;

  useEffect(() => {
    peer.on("open", setPeerId);
    peer.on("error", (error) => console.error(error));
  }, []);

  useEffect(() => {
    if (!id) return;
    const channel = supabase
      .channel("emergency-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "Emergencies",
          filter: `id=eq.${id}`,
        },
        async (payload) => {
          const res = payload.new as Emergencies;

          if (res.status === "CANCELED") {
            return setData({} as Emergencies);
          }
          setData(res);
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [id]);

  return (
    <EmergencyContext.Provider
      value={{
        data: data,
        setData: setData,
        peer: peer,
        peerId: peerId,
        location: location,
        setLocation: setLocation,
        gpsCoordinates: gpsCoordinates,
        setGpsCoordinates: setGpscoordinates,
      }}
    >
      {children}
    </EmergencyContext.Provider>
  );
};

export default EmergencyDataProvider;
