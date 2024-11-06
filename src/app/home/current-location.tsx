"use client";
import { Locate, MapPin } from "lucide-react";
import { useContext, useEffect } from "react";
import { EmergencyContext } from "./emergency-data-provider";

const fetchLocationName = async (lat: number, lon: number) => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
    );

    const { display_name } = await res.json();

    return display_name;
  } catch (error: any) {
    console.error(error.message);
  }
};

const CurrentLocation = () => {
  const { location, gpsCoordinates, setGpsCoordinates, setLocation } =
    useContext(EmergencyContext);

  useEffect(() => {
    if (!gpsCoordinates && !location) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async ({ coords }) => {
            const { latitude, longitude } = coords;
            setGpsCoordinates([latitude, longitude]);
            const name = await fetchLocationName(latitude, longitude);
            setLocation(name);

            // Execute the action only if coordinates and locationName are both set
          },
          (error) => {
            console.error("Geolocation error:", error);
          },
          { enableHighAccuracy: true }
        );
      }
    }
  }, [location, location]);

  return (
    <div className="w-full bg-background p-4 rounded-xl shadow-md">
      <h1 className="font-medium">Your current location</h1>
      {location ? (
        <div className="flex gap-1 text-sm text-primary">
          <MapPin size={20} />
          <span>{location}</span>
        </div>
      ) : (
        <div className="flex gap-1 animate-pulse  text-sm text-primary">
          <Locate size={20} />
          <span>Getting your location..</span>
        </div>
      )}
    </div>
  );
};

export default CurrentLocation;
