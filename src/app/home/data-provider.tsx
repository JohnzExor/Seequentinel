"use client";

import { initializePeer } from "@/lib/peer";
import supabase from "@/lib/storage";
import { Emergencies } from "@prisma/client";
import Peer from "peerjs";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

type TUserData = {
  peer?: Peer | null;
  userPeerId?: string | null;
  activeEmergency?: Emergencies | undefined;
  setActiveEmergency?: Dispatch<SetStateAction<Emergencies | undefined>>;
  gpsCoordinates?: [number, number] | undefined;
  setGpsCoordinates?: React.Dispatch<
    React.SetStateAction<[number, number] | undefined>
  >;
  isOutsideCampus?: boolean;
  setIsOutsideCampus?: Dispatch<SetStateAction<boolean>>;
};

export const UserDataContext = createContext<TUserData>({});

const peer = initializePeer();

const UserDataProvider = ({ children }: { children: ReactNode }) => {
  const [isOutsideCampus, setIsOutsideCampus] = useState(true);
  const [userPeerId, setUserPeerId] = useState<string>();
  const [activeEmergency, setActiveEmergency] = useState<
    Emergencies | undefined
  >(undefined);

  const [gpsCoordinates, setGpsCoordinates] = useState<
    [number, number] | undefined
  >(undefined);

  useEffect(() => {
    peer.on("open", setUserPeerId);
    const channel = supabase
      .channel("reports-db-document-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "Emergencies",
          filter: `id=eq.${activeEmergency?.id}`,
        },
        async (payload) => {
          setActiveEmergency(payload.new as Emergencies);
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeEmergency, setActiveEmergency]);

  return (
    <UserDataContext.Provider
      value={{
        peer,
        userPeerId,
        activeEmergency,
        setActiveEmergency,
        gpsCoordinates,
        setGpsCoordinates,
        isOutsideCampus,
        setIsOutsideCampus,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataProvider;
