"use client";
import { Locate, MapPin } from "lucide-react";
import { useContext } from "react";
import { EmergencyContext } from "@/app/home/emergency-data-provider";

const CurrentLocation = () => {
  const { data } = useContext(EmergencyContext);

  return (
    <div>
      <h1 className="font-medium">Your current location</h1>
      {data.location ? (
        <div className="flex items-center gap-1 text-sm text-primary">
          <MapPin size={20} />
          <span>{data.location}</span>
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
