"use client";
import { Locate, MapPin } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useServerAction } from "zsa-react";
import { updateEmergencyLocationAction } from "./actions";
import { DataContext } from "./data-provider";

const fetchLocationName = async (lat: number, lon: number) => {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
  );

  const { display_name } = await res.json();

  return display_name;
};

const CurrentLocation = () => {
  const [coordinates, setCoordinates] = useState<string>();
  const [locationName, setLocationName] = useState<string>();

  const { execute } = useServerAction(updateEmergencyLocationAction);
  const { data } = useContext(DataContext);

  useEffect(() => {
    // Execute the action when coordinates and locationName are available
    const updateLocation = async () => {
      if (data.id && coordinates && locationName) {
        await execute({
          id: data.id,
          gpsCoordinates: coordinates,
          location: locationName,
        });
      }
    };

    updateLocation(); // Call the update function

    if (!coordinates && !locationName) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async ({ coords }) => {
            const { latitude, longitude } = coords;
            setCoordinates(`${latitude},${longitude}`);
            const name = await fetchLocationName(latitude, longitude);
            setLocationName(name);

            // Execute the action only if coordinates and locationName are both set
          },
          (error) => {
            console.error("Geolocation error:", error);
          },
          { enableHighAccuracy: true }
        );
      }
    }
  }, [coordinates, locationName, data.id, execute]);

  return (
    <div className="fixed z-30 top-0 p-4">
      <div className=" bg-background p-3 rounded-xl text-sm shadow-xl md:hover:scale-105 duration-500 ease-in-out">
        {locationName ? (
          <div className="flex gap-2 items-center">
            <MapPin size={15} />
            <span>{locationName}</span>
          </div>
        ) : (
          <Locate size={15} className=" animate-pulse" />
        )}
      </div>
    </div>
  );
};

export default CurrentLocation;
