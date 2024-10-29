"use client";

import { LatLngExpression, LatLngTuple } from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import UserLocationMarker from "./user-location-marker";

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
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <UserLocationMarker />
      </MapContainer>
    </>
  );
};

export default Map;
