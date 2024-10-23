"use client";

import supabase from "@/lib/storage";
import { Reports } from "@prisma/client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

type TContext = {
  data: Reports;
  setData: Dispatch<SetStateAction<Reports>>;
};

export const DataContext = createContext<TContext>({
  data: {} as Reports,
  setData: () => {},
});

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<Reports>({} as Reports);
  const { id } = data;

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
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};
