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
    <div>
      <h1 className="font-medium">Your current location</h1>
      {locationName ? (
        <div className="flex items-center gap-1 text-sm text-primary">
          <MapPin size={20} />
          <span>{locationName}</span>
        </div>
      ) : (
        <div className="flex items-center gap-1 animate-pulse  text-sm text-primary">
          <Locate size={20} />
          <span>Getting your location..</span>
        </div>
      )}
    </div>
  );
};

export default CurrentLocation;
