import { CallStatusEnum } from "@prisma/client";
import { MapPin } from "lucide-react";

const callStatusState: { name: CallStatusEnum; description: string }[] = [
  {
    name: "Pending",
    description:
      "The emergency call is in the queue and has not yet been connected.",
  },
  {
    name: "Connected",
    description:
      "The emergency call has been successfully connected with the authorities.",
  },
  {
    name: "Disconnected",
    description:
      "The emergency call was connected but has been disconnected or dropped.",
  },
  {
    name: "Failed",
    description:
      "The emergency call failed to connect, possibly due to network issues.",
  },
  {
    name: "Canceled",
    description:
      "The emergency call was canceled before it could connect with the authorities.",
  },
];

const CallStatusIdentifier = ({
  status,
  location,
}: {
  status: CallStatusEnum;
  location: string | undefined;
}) => {
  return (
    <>
      {callStatusState.map(({ name, description }, index) =>
        name === status ? (
          <div key={index} className="w-full">
            {location ? (
              <span className="text-xs flex items-start gap-1">
                <MapPin size={15} />
                {location}
              </span>
            ) : null}
            <h1 className=" font-semibold">{name}</h1>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        ) : null
      )}
    </>
  );
};

export default CallStatusIdentifier;
