"use client";

import { LatLngExpression, LatLngTuple } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Emergencies } from "@prisma/client";
import { emergencyIcon } from "./icons";
import Link from "next/link";

const zoom = 30;

const LeafletMap = ({
  posix,
  emergencies,
}: {
  posix: LatLngExpression | LatLngTuple;
  emergencies: Emergencies[];
}) => {
  return (
    <>
      <MapContainer
        center={posix}
        zoom={zoom}
        className=" w-full h-full z-10 rounded-xl"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {emergencies?.map(({ id, gpsCoordinates }, index) => (
          <Marker
            key={index} // Add a unique key for each marker
            position={gpsCoordinates as unknown as LatLngExpression} // Position expects an array [lat, lng]
            icon={emergencyIcon}
            // eventHandlers={{ click: () => onMarkerClick() }}
          >
            <Popup>
              <Link
                href={`/admin/dashboard/emergencies/${id}`}
                className="underline"
              >
                View Emergency
              </Link>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

export default LeafletMap;
