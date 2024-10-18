"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { LatLngExpression, LatLngTuple } from "leaflet";

import "leaflet/dist/leaflet.css";
import UserLocationMarker from "./user-location-marker";
import { universityIcon } from "./icons";
import Emergencies from "./emergencies";
import ViewEmergencyDetails from "./view-emergency-details";
import { useState } from "react";

import RoutingMachine from "./routing-machine";
import { userLocation } from "./data";

const zoom = 18;

const RealtimeMap = ({ posix }: { posix: LatLngExpression | LatLngTuple }) => {
  const [isViewEmergency, setIsViewEmergency] = useState(false);

  const handleViewEmergency = () => {
    setIsViewEmergency(!isViewEmergency);
  };

  return (
    <>
      {isViewEmergency ? (
        <ViewEmergencyDetails closeSidebar={handleViewEmergency} />
      ) : null}
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
        <Marker position={posix} icon={universityIcon}>
          <Popup>Palawan State University</Popup>
        </Marker>
        <UserLocationMarker />
        <RoutingMachine />
        <Emergencies onMarkerClick={handleViewEmergency} />
      </MapContainer>
    </>
  );
};

export default RealtimeMap;
