"use client";

import { initializePeer } from "@/lib/peer";
import Peer from "peerjs";
import { createContext, ReactNode, useEffect, useState } from "react";

export type IAdminData = {
  peer?: Peer;
  adminPeerId?: string;
};

export const AdminDataContext = createContext<IAdminData>({});

const peer = initializePeer();

const AdminDataProvider = ({ children }: { children: ReactNode }) => {
  const [adminPeerId, setAdminPeerId] = useState<string>();

  useEffect(() => {
    peer.on("open", setAdminPeerId);
    peer.on("error", () => console.error("Error peer"));
  }, []);

  return (
    <AdminDataContext.Provider value={{ peer, adminPeerId }}>
      {children}
    </AdminDataContext.Provider>
  );
};

export default AdminDataProvider;
