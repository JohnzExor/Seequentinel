"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { LatLngExpression, LatLngTuple } from "leaflet";

import "leaflet/dist/leaflet.css";
import UserLocationMarker from "./user-location-marker";

const zoom = 18;

const RealtimeMap = ({ posix }: { posix: LatLngExpression | LatLngTuple }) => {
  return (
    <>
      <MapContainer
        center={posix}
        zoom={zoom}
        scrollWheelZoom={true}
        className=" w-full h-screen z-10"
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

export default RealtimeMap;
