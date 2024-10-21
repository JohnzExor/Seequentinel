"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { LatLngExpression, LatLngTuple } from "leaflet";

import "leaflet/dist/leaflet.css";
import UserLocationMarker from "./user-location-marker";
import { universityIcon } from "./icons";
import Emergencies from "./emergencies";
import { useEffect, useState } from "react";
import RoutingMachine from "./routing-machine";
import { Reports } from "@prisma/client";
import EmergencyList from "./emergency-list";
import { Button } from "@/components/ui/button";
import FlyToLocation from "./fly-to-location";
import supabase from "@/lib/storage";
import CallRoom from "./call-room";
import { useSession } from "next-auth/react";
const zoom = 18;

const RealtimeMap = ({
  emergencies,
  posix,
}: {
  emergencies: Reports[];
  posix: LatLngExpression | LatLngTuple;
}) => {
  const session = useSession();
  const [isViewEmergency, setIsViewEmergency] = useState(true);
  const [data, setData] = useState<Reports[]>(emergencies);
  const [currentPosition, setCurrentPosition] = useState<LatLngExpression>([
    0, 0,
  ]);
  const [selectedPosition, setSelectedPosition] = useState<LatLngExpression>([
    0, 0,
  ]);

  const [currentCallRoom, setCurrentCallRoom] = useState<string>();

  const handleViewEmergency = () => {
    setIsViewEmergency(!isViewEmergency);
  };

  const handleCurrentPosition = (position: LatLngExpression) => {
    setCurrentPosition(position);
  };
  const handleSelectedLocation = (position: LatLngExpression) => {
    setSelectedPosition(position);
  };

  const handleAcceptedCall = (room: string) => {
    setCurrentCallRoom(room);
  };

  useEffect(() => {
    const channel = supabase
      .channel("emergency-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "Reports",
        },
        async (payload) => {
          const res = payload.new as Reports;
          if (res.callStatus !== "Pending") {
            return setData((prevData) =>
              prevData.filter((report) => report.id !== res.id)
            );
          }
          setData([...data, payload.new as Reports]);
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [data, setData]);

  return (
    <>
      {currentCallRoom ? (
        <div className=" bottom-0 w-full md:max-w-[25em] lg:max-w-[40em] fixed z-20 p-3 space-y-2 lg:hover:scale-105 duration-500 ease-in-out cursor-pointer">
          <div className="bg-background w-full h-full rounded-xl shadow-2xl flex flex-col items-center gap-2 p-3">
            <CallRoom
              room={currentCallRoom}
              name={session.data?.user.email as string}
              onLeave={() => setCurrentCallRoom("")}
            />
          </div>
        </div>
      ) : null}
      {isViewEmergency ? (
        <EmergencyList
          acceptedCall={handleAcceptedCall}
          setSelectedPosition={handleSelectedLocation}
          data={data}
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
        <Emergencies emergencies={data} onMarkerClick={handleViewEmergency} />
      </MapContainer>
    </>
  );
};

export default RealtimeMap;
