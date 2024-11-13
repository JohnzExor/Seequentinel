"use client";

import { LatLngExpression, LatLngTuple } from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import UserLocationMarker from "./user-location-marker";

const zoom = 30;

const LeafletMap = ({ posix }: { posix: LatLngExpression | LatLngTuple }) => {
  return (
    <>
      <MapContainer
        center={posix}
        zoom={zoom}
        className=" w-full h-full z-10 rounded-xl"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <UserLocationMarker />
      </MapContainer>
    </>
  );
};

export default LeafletMap;
