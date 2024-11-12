"use client";

import { LatLngExpression, LatLngTuple } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import RoutingMachine from "./routing-machine";
import { useContext } from "react";
import { EmergencyDataContext, responders } from "./emergency-data-provider";
import { emergencyIcon, responderIcon } from "./icons";
const zoom = 30;

const LeafletMap = ({ posix }: { posix: LatLngExpression | LatLngTuple }) => {
  const { endPoint } = useContext(EmergencyDataContext);

  return (
    <>
      <MapContainer
        center={posix}
        zoom={zoom}
        className=" w-full h-full z-10 rounded-b-2xl"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <RoutingMachine />
        <Marker position={endPoint} icon={emergencyIcon}>
          <Popup>Caller</Popup>
        </Marker>
        {responders.map(({ coordinates }, index) => (
          <Marker key={index} position={coordinates} icon={responderIcon}>
            <Popup>Responder</Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

export default LeafletMap;
