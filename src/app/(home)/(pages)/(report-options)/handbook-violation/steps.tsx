import {
  ClipboardCheck,
  ImageUp,
  ListCheck,
  LucideCalendar,
  MapPinned,
  RectangleEllipsisIcon,
} from "lucide-react";
import { ReactNode } from "react";

export type ISteps = {
  name: string;
  short: string;
  description: string;
  icon: ReactNode;
  step: number;
};

export const steps: ISteps[] = [
  {
    name: "Violation",
    description:
      "Choose the type of violation from the provided list. This will categorize the issue based on predefined violation types.",
    short: "Select a violation",
    icon: <RectangleEllipsisIcon />,
    step: 0,
  },
  {
    name: "Violation Date",
    description:
      "Pick the date when the violation occurred. This is essential for tracking and reviewing the incident.",
    short: "Select the date of the violation",
    icon: <LucideCalendar />,
    step: 1,
  },
  {
    name: "Evidence",
    description:
      "Upload media files such as photos, videos, or audio clips that serve as proof of the violation.",
    short: "Provide media files for proof",
    icon: <ImageUp />,
    step: 2,
  },
  {
    name: "Location",
    description:
      "Specify the exact location where the violation took place. This could be an address or a pinned point on a map.",
    short: "Place where it happened",
    icon: <MapPinned />,
    step: 3,
  },
  {
    name: "Details",
    description:
      "Provide any additional information, context, or clarifications that might be relevant to the violation.",
    short: "Provide additional info",
    icon: <ListCheck />,
    step: 4,
  },

  {
    name: "Review & Submit",
    short: "Please review before you submit",

    description:
      "Review all the information you've provided, ensuring everything is accurate. Once verified, submit the request, and the maintenance team will be notified to begin addressing the issue.",
    icon: <ClipboardCheck size={30} />,
    step: 4,
  },
];
