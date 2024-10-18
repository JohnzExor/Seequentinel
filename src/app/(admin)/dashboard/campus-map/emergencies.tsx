"use client";

import { Marker, Popup } from "react-leaflet";
import { emergencyIcon } from "./icons";

const Emergencies = ({ onMarkerClick }: { onMarkerClick: () => void }) => {
  return (
    <Marker
      position={[9.778374, 118.733945]}
      icon={emergencyIcon}
      eventHandlers={{ click: () => onMarkerClick() }}
    >
      <Popup>Emergency</Popup>
    </Marker>
  );
};

export default Emergencies;
