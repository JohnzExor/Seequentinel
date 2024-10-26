"use client";

import supabase from "@/lib/storage";
import { Reports } from "@prisma/client";
import { LatLngExpression } from "leaflet";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

type TContext = {
  data: Reports[];
  startPoint: LatLngExpression;
  endPoint: LatLngExpression;
  setStartPoint: Dispatch<SetStateAction<L.LatLngExpression>>;
  setEndPoint: Dispatch<SetStateAction<L.LatLngExpression>>;
};

export const DataContext = createContext<TContext>({
  data: [],
  startPoint: [0, 0],
  endPoint: [0, 0],
  setStartPoint: () => {},
  setEndPoint: () => {},
});

export const DataProvider = ({
  emergencyData,
  children,
}: {
  emergencyData: Reports[];
  children: ReactNode;
}) => {
  const [data, setData] = useState(emergencyData);
  const [startPoint, setStartPoint] = useState<LatLngExpression>([0, 0]);
  const [endPoint, setEndPoint] = useState<LatLngExpression>([0, 0]);

  useEffect(() => {
    const channel = supabase
      .channel("emergency-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "Reports",
        },
        async (payload) => {
          const res = payload.new as Reports;
          setData((prevData) => {
            if (res.callStatus === "Canceled") {
              return prevData.filter(({ id }) => id !== res.id);
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
      value={{ data, startPoint, endPoint, setStartPoint, setEndPoint }}
    >
      {children}
    </DataContext.Provider>
  );
};
