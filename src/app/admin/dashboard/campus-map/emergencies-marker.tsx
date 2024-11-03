"use client";

import { Marker, Popup } from "react-leaflet";
import { useContext } from "react";
import { emergencyIcon } from "./icons";
import { DataContext } from "./data-provider";
import { LatLngExpression } from "leaflet";

const EmergenciesMarker = () => {
  const { data } = useContext(DataContext);

  return (
    <>
      {data.map(({ gpsCoordinates }, index) => (
        <Marker
          key={index} // Add a unique key for each marker
          position={gpsCoordinates as unknown as LatLngExpression} // Position expects an array [lat, lng]
          icon={emergencyIcon}
          // eventHandlers={{ click: () => onMarkerClick() }}
        >
          <Popup>Emergency</Popup>
        </Marker>
      ))}
    </>
  );
};

export default EmergenciesMarker;
