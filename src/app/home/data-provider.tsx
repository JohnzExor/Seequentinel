"use client";

import { initializePeer } from "@/lib/peer";
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
};

export const UserDataContext = createContext<TUserData>({});

const peer = initializePeer();

const UserDataProvider = ({ children }: { children: ReactNode }) => {
  const [userPeerId, setUserPeerId] = useState<string>();
  const [activeEmergency, setActiveEmergency] = useState<
    Emergencies | undefined
  >(undefined);

  const [gpsCoordinates, setGpsCoordinates] = useState<
    [number, number] | undefined
  >(undefined);

  useEffect(() => {
    peer.on("open", setUserPeerId);
  }, []);

  return (
    <UserDataContext.Provider
      value={{
        peer,
        userPeerId,
        activeEmergency,
        setActiveEmergency,
        gpsCoordinates,
        setGpsCoordinates,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataProvider;
