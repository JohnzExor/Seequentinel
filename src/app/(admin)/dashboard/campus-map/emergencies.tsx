"use client";

import { Marker, Popup } from "react-leaflet";
import { emergencyIcon } from "./icons";
import { Reports } from "@prisma/client";
import { useEffect } from "react";

const Emergencies = ({
  emergencies,
  onMarkerClick,
}: {
  emergencies: Reports[];
  onMarkerClick: () => void;
}) => {
  useEffect(() => {}, []);

  return (
    <>
      {emergencies.map(({ gpsCoordinates }, index) => {
        // Ensure gpsCoordinates exist and convert them into [lat, lng] numbers
        const position: [number, number] | null = gpsCoordinates
          ? (gpsCoordinates
              .split(",")
              .map((coord) => parseFloat(coord.trim())) as [number, number])
          : null;

        if (!position || position.length !== 2) return null; // Handle invalid coordinates

        return (
          <Marker
            key={index} // Add a unique key for each marker
            position={position} // Position expects an array [lat, lng]
            icon={emergencyIcon}
            eventHandlers={{ click: () => onMarkerClick() }}
          >
            <Popup>Emergency</Popup>
          </Marker>
        );
      })}
    </>
  );
};

export default Emergencies;
