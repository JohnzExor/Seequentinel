"use client";

import { Emergencies } from "@prisma/client";
import { LatLngExpression } from "leaflet";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { AdminDataContext } from "../../data-provider";

type TContext = {
  data: Emergencies | null;
  startPoint: LatLngExpression;
  endPoint: LatLngExpression;
  setStartPoint: Dispatch<SetStateAction<L.LatLngExpression>>;
  setEndPoint: Dispatch<SetStateAction<L.LatLngExpression>>;
};

export const EmergencyDataContext = createContext<TContext>({
  data: null,
  startPoint: [0, 0],
  endPoint: [0, 0],
  setStartPoint: () => {},
  setEndPoint: () => {},
});

export const responders: {
  name: string;
  location: string;
  timeToArrive: number;
  coordinates: [number, number];
}[] = [
  {
    name: "Clinic",
    location: "Beside CTE Annex Building",
    timeToArrive: 1,
    coordinates: [9.7788817, 118.7351049],
  },
  {
    name: "Nursing",
    location: "In front of Palsu Library",
    timeToArrive: 1,
    coordinates: [9.778211, 118.7345233],
  },
];

export const EmergencyDataProvider = ({
  children,
  emergencyId,
}: {
  children: ReactNode;
  emergencyId: string;
}) => {
  const [startPoint, setStartPoint] = useState<LatLngExpression>([0, 0]);
  const [endPoint, setEndPoint] = useState<LatLngExpression>([0, 0]);

  const { emergencies } = useContext(AdminDataContext);

  const data = emergencies?.find(({ id }) => id === emergencyId) as Emergencies;

  useEffect(() => {
    if (responders[0]) {
      const coordinates = responders[0].coordinates;
      setStartPoint(coordinates);
    }

    if (emergencies && data.gpsCoordinates) {
      setEndPoint(data.gpsCoordinates as unknown as LatLngExpression);
    }
  }, []);

  return (
    <EmergencyDataContext.Provider
      value={{
        data,
        startPoint,
        endPoint,
        setStartPoint,
        setEndPoint,
      }}
    >
      {children}
    </EmergencyDataContext.Provider>
  );
};
