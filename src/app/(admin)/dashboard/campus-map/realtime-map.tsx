"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { LatLngExpression, LatLngTuple } from "leaflet";

import "leaflet/dist/leaflet.css";
import UserLocationMarker from "./user-location-marker";
import { universityIcon } from "./icons";
import Emergencies from "./emergencies";
import { useState } from "react";
import RoutingMachine from "./routing-machine";
import { Reports } from "@prisma/client";
import EmergencyList from "./emergency-list";
import { Button } from "@/components/ui/button";
import FlyToLocation from "./fly-to-location";
const zoom = 18;

const RealtimeMap = ({
  emergencies,
  posix,
}: {
  emergencies: Reports[];
  posix: LatLngExpression | LatLngTuple;
}) => {
  const [isViewEmergency, setIsViewEmergency] = useState(true);

  const [currentPosition, setCurrentPosition] = useState<LatLngExpression>([
    0, 0,
  ]);
  const [selectedPosition, setSelectedPosition] = useState<LatLngExpression>([
    0, 0,
  ]);

  const handleViewEmergency = () => {
    setIsViewEmergency(!isViewEmergency);
  };

  const handleCurrentPosition = (position: LatLngExpression) => {
    setCurrentPosition(position);
  };
  const handleSelectedLocation = (position: LatLngExpression) => {
    setSelectedPosition(position);
  };

  return (
    <>
      {isViewEmergency ? (
        <EmergencyList
          setSelectedPosition={handleSelectedLocation}
          data={emergencies}
          closeSidebar={handleViewEmergency}
        />
      ) : (
        <div className=" right-0 p-3 fixed z-20">
          <Button onClick={handleViewEmergency}>View all emergencies</Button>
        </div>
      )}
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
        {/* <FlyToLocation location={selectedPosition} /> */}
        <Marker position={posix} icon={universityIcon}>
          <Popup>Palawan State University</Popup>
        </Marker>
        <UserLocationMarker setUserPosition={handleCurrentPosition} />
        <RoutingMachine waypoints={[currentPosition, selectedPosition]} />
        <Emergencies
          emergencies={emergencies}
          onMarkerClick={handleViewEmergency}
        />
      </MapContainer>
    </>
  );
};

export default RealtimeMap;
