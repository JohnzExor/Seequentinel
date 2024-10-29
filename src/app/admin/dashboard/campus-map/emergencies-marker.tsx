"use client";

import { Marker, Popup } from "react-leaflet";
import { useContext } from "react";
import { emergencyIcon } from "./icons";
import { DataContext } from "./data-provider";

const EmergenciesMarker = () => {
  const { data } = useContext(DataContext);

  return (
    <>
      {data.map(({ gpsCoordinates }, index) => {
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
            // eventHandlers={{ click: () => onMarkerClick() }}
          >
            <Popup>Emergency</Popup>
          </Marker>
        );
      })}
    </>
  );
};

export default EmergenciesMarker;
