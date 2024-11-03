"use client";

import { LatLngExpression, LatLngTuple } from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import UserLocationMarker from "./user-location-marker";
import RoutingMachine from "./routing-machine";
import EmergenciesMarker from "./emergencies-marker";

const zoom = 18;

const Map = ({ posix }: { posix: LatLngExpression | LatLngTuple }) => {
  return (
    <>
      <MapContainer
        center={posix}
        zoom={zoom}
        scrollWheelZoom={true}
        className=" w-full h-full z-10 rounded-xl"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <RoutingMachine />
        <UserLocationMarker />
        <EmergenciesMarker />
      </MapContainer>
    </>
  );
};

export default Map;
