"use client";

import { useContext } from "react";
import { UserDataContext } from "../data-provider";
import { EmergencyStatusEnum } from "@prisma/client";
import {
  CheckCircle,
  CircleAlert,
  Clock,
  MapPin,
  Phone,
  PhoneCall,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import clsx from "clsx";

const getStateInfo = (state?: EmergencyStatusEnum) => {
  switch (state) {
    case "PENDING":
      return {
        icon: Phone,
        color: "bg-primary text-white",
        name: "Pending",
        badge: "Estimated wait: 2 min",
        person: "You",
        personDetails: "Waiting for an Admin",
        details: "Please stay on the line. An admin will be with you shortly.",
      };
    case "ACTIVE":
      return {
        icon: Phone,
        color: "bg-emerald-500 text-white",
        name: "Call in progress",
        badge: "Duration: ",
        person: "Operator: ",
        personDetails: "Seequentinel Admin",
      };
    case "CANCELED":
      return {
        icon: XCircle, // Example of a different icon
        name: "Call canceled",
      };
    case "COMPLETED":
      return {
        icon: CheckCircle, // Example of a different icon
        color: "bg-sky-500 text-white",
        name: "Call time: ",
        person: "Emergency Services",
        personDetails: "Call Completed",
        details:
          "Emergency services have been dispatched. Stay calm and follow the provided instructions.",
      };
    case "FAILED":
      return {
        icon: XCircle, // Example of a different icon
        color: "bg-red-500 text-white",
        badge: "Failed",
        name: "Call failed",
      };
    default: {
      return {
        icon: XCircle, // Example of a different icon
        color: "bg-red-500 text-white",
        badge: "Ended",
        name: "Call Ended",
        person: "You",
        personDetails: "Request a new call in the home page",
      };
    }
  }
};

const additionalDetails = [
  {
    name: "When to Arrive",
    icon: Clock,
    details: "Immediately. Emergency services are available 24/7.",
  },
  {
    name: "Emergency Contact",
    icon: PhoneCall,
    details:
      "Call 911 for immediate assistance <br/> Non-emergency: (555) 123-4567",
  },
  {
    name: "Location",
    icon: MapPin,
    details:
      "City General Hospital <br/> 123 Emergency Lane, Cityville, ST 12345",
  },
  {
    name: "Additional Information",
    icon: CircleAlert,
    details:
      "Bring identification and insurance information if possible <br/> Inform staff of any allergies or current medications <br/> Follow all instructions given by emergency personnel",
  },
];

const EmergencyDetails = () => {
  const { activeEmergency } = useContext(UserDataContext);
  const {
    icon: Icon,
    color,
    name,
    badge,
    person,
    personDetails,
    details,
  } = getStateInfo(activeEmergency?.status);

  return (
    <div className="space-y-4 p-4 md:p-0">
      <div className="shadow-md rounded-xl">
        <div
          className={clsx(
            color,
            "bg-muted rounded-t-xl p-4 flex items-center justify-between"
          )}
        >
          <div className="flex items-center gap-1">
            <Icon />
            <span className="font-medium text-xl">{name}</span>
          </div>
          <Badge variant={"secondary"}>{badge}</Badge>
        </div>

        <div className="space-y-4 bg-white p-4 rounded-b-xl">
          <div className="flex items-center gap-2">
            <Avatar className="w-[3em] h-[3em]">
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-bold">{person}</h1>
              <span className="text-sm text-muted-foreground">
                {personDetails}
              </span>
            </div>
          </div>
          {details ? <p className="text-sm">{details}</p> : null}
        </div>
      </div>
      <ul className="space-y-4">
        {additionalDetails.map(({ icon: Icon, name, details }, index) => (
          <li key={index}>
            <div className="flex items-center gap-1 font-bold p-2 bg-primary-foreground rounded-t-xl">
              <Icon />
              {name}
            </div>
            <div className="bg-white rounded-b-xl p-4">
              <span className="text-muted-foreground text-sm">{details}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmergencyDetails;
