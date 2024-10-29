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
import { Reports } from "@prisma/client";
import supabase from "@/lib/storage";

type TContext = {
  data: Reports;
  setData: Dispatch<SetStateAction<Reports>>;
  peer: Peer;
  peerId: string | undefined;
  location: string | undefined;
  setLocation: React.Dispatch<React.SetStateAction<string | undefined>>;
  gpsCoordinates: string | undefined;
  setGpsCoordinates: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export const EmergencyContext = createContext<TContext>({
  data: {} as Reports,
  setData: () => {},
  peer: {} as Peer,
  peerId: undefined,
  location: undefined,
  setLocation: () => {},
  gpsCoordinates: undefined,
  setGpsCoordinates: () => {},
});

const peer = initializePeer();

const EmergencyDataProvider = ({ children }: { children: ReactNode }) => {
  const [peerId, setPeerId] = useState<string>();
  const [data, setData] = useState<Reports>({} as Reports);
  const [location, setLocation] = useState<string>();
  const [gpsCoordinates, setGpscoordinates] = useState<string>();
  const { id } = data;

  useEffect(() => {
    peer.on("open", setPeerId);
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
          table: "Reports",
          filter: `id=eq.${id}`,
        },
        async (payload) => {
          const res = payload.new as Reports;

          if (res.callStatus === "Canceled") {
            return setData({} as Reports);
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
