"use client";

import { useEffect, useState } from "react";
import { Calendar, ChevronRight, LoaderCircle, MapPin } from "lucide-react";
import { Decimal } from "@prisma/client/runtime/library";
import Link from "next/link";
import { Emergencies } from "@prisma/client";

const fetchLocationName = async (coordinates: Decimal[]) => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coordinates[0]}&lon=${coordinates[1]}`
    );

    const { display_name } = await res.json();

    return display_name;
  } catch (error) {
    console.error(error);
  }
};

const EmergenciesList = ({ emergencies }: { emergencies: Emergencies[] }) => {
  const [locations, setLocations] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchLocations = async () => {
      if (!emergencies) return;
      const locationPromises = emergencies.map(
        async ({ id, gpsCoordinates }) => {
          if (gpsCoordinates) {
            const locationName = await fetchLocationName(gpsCoordinates);
            return { id, locationName };
          }
          return { id, locationName: "No GPS data" };
        }
      );

      const resolvedLocations = await Promise.all(locationPromises);
      const locationMap = resolvedLocations.reduce(
        (acc, { id, locationName }) => ({ ...acc, [id]: locationName }),
        {}
      );
      setLocations(locationMap);
    };

    if (emergencies && emergencies.length) {
      fetchLocations();
    }
  }, [emergencies]);

  return (
    <ul className="space-y-2">
      {emergencies ? (
        emergencies.length > 0 ? (
          emergencies.map(({ id, callStart, status }, index) => (
            <li key={index} className="even:bg-primary/10 rounded-xl">
              <Link
                href={`/admin/dashboard/emergencies/${id}`}
                className="flex justify-between border-2 rounded-xl hover:bg-primary/50 p-3 border-l-primary group duration-500 ease-out"
              >
                <div>
                  <span className="text-xs text-muted-foreground">
                    {status}
                  </span>
                  <h1 className="font-bold text-sm">{id.slice(0, 6)}...</h1>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar size={15} />
                    <span>TIME OF CALL</span>
                  </div>
                  <h1 className="text-sm font-medium">
                    {callStart.toLocaleString()}
                  </h1>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin size={15} />
                    <span>Location</span>
                  </div>
                  <h1 className="text-sm font-medium">
                    {locations[id] ? (
                      locations[id].slice(0, 32) + "..."
                    ) : (
                      <LoaderCircle size={15} className=" animate-spin" />
                    )}
                  </h1>
                </div>
                <ChevronRight />
              </Link>
            </li>
          ))
        ) : (
          <span>No emergencies</span>
        )
      ) : null}
    </ul>
  );
};

export default EmergenciesList;
