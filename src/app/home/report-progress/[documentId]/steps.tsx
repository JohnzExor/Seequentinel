import { StatusEnum } from "@prisma/client";
import { ClipboardCheck, ImageUp, ListCheck, MapPinned } from "lucide-react";
import { ReactNode } from "react";

export type ISteps = {
  name: StatusEnum;
  description: string;
  icon: ReactNode;
  step: number;
};

export const steps: ISteps[] = [
  {
    name: "Request",
    description: "Your request has been submitted and is under review.",
    icon: <ListCheck size={30} />,
    step: 1,
  },
  {
    name: "Reviewing",
    description: "The team is reviewing your request and media files.",
    icon: <ImageUp size={30} />,
    step: 2,
  },
  {
    name: "Accepted",
    description: "The request is accepted and the location confirmed.",
    icon: <MapPinned size={30} />,
    step: 3,
  },
  {
    name: "Completed",
    description: "The issue has been resolved successfully.",
    icon: <ClipboardCheck size={30} />,
    step: 4,
  },
];
