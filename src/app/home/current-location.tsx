"use client";
import { Locate, MapPin, University } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "./data-provider";
import { isWithinUniversity } from "@/components/campus-location-verifier";

const fetchLocationName = async (lat: number, lon: number) => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
    );

    const { display_name } = await res.json();

    return display_name;
  } catch (error) {
    console.error(error);
  }
};

const CurrentLocation = () => {
  const [location, setLocation] = useState<string>();

  const {
    gpsCoordinates,
    setGpsCoordinates,
    setIsOutsideCampus,
    isOutsideCampus,
  } = useContext(UserDataContext);

  useEffect(() => {
    if (
      !gpsCoordinates &&
      !location &&
      setGpsCoordinates &&
      setIsOutsideCampus
    ) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async ({ coords }) => {
            const { latitude, longitude } = coords;
            setGpsCoordinates([latitude, longitude]);
            const name = await fetchLocationName(latitude, longitude);
            setLocation(name);

            if (isWithinUniversity(latitude, longitude)) {
              console.log(
                "You are inside the university. Enabling the option."
              );
              setIsOutsideCampus(false);
              // Enable the option or feature
            } else {
              console.log(
                "You are outside the university. Disabling the option."
              );
              setIsOutsideCampus(true);
              // Disable the option or feature
            }
            // Execute the action only if coordinates and locationName are both set
          },
          (error) => {
            console.error("Geolocation error:", error);
          },
          { enableHighAccuracy: true }
        );
      }
    }
  }, [location]);

  return (
    <div className="w-full bg-background p-4 rounded-xl shadow-md space-y-2">
      <h1 className="font-medium">Your current location</h1>
      {location ? (
        <>
          <div className="flex gap-1 text-sm text-primary">
            <MapPin size={20} />
            <span>{location}</span>
          </div>
          <div className="flex items-center justify-center gap-1 bg-primary text-white p-2 rounded-xl text-sm">
            <University />
            <span>
              {isOutsideCampus
                ? "You are outside the university"
                : "You are inside the university."}
            </span>
          </div>
        </>
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
