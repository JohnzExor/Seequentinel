"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { LatLngExpression, LatLngTuple } from "leaflet";

import "leaflet/dist/leaflet.css";
import UserLocationMarker from "./user-location-marker";
import RoutingMachine from "./routing-machine";
import { useState } from "react";

const RealtimeMap = ({ posix }: { posix: LatLngExpression | LatLngTuple }) => {
  const zoom = 18;
  const [userLocation, setUserLocation] = useState();

  return (
    <MapContainer
      center={posix}
      zoom={zoom}
      scrollWheelZoom={true}
      className=" w-full h-screen"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={posix}>
        <Popup>Palawan State University</Popup>
      </Marker>
      <UserLocationMarker />
      <RoutingMachine />
    </MapContainer>
  );
};

export default RealtimeMap;
