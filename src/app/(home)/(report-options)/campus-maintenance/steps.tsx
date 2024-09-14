import {
  ClipboardCheck,
  ImageUp,
  ListCheck,
  LucideProps,
  MapPinned,
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
    name: "Details",
    short: "Give the details of the problem",
    description:
      "Select the type of maintenance needed from the available categories such as electrical, plumbing, or structural repairs. This helps direct your request to the appropriate team for quicker resolution.",
    icon: <ListCheck size={30} />,
    step: 1,
  },
  {
    name: "Photo",
    short: "Provide media files for proof",

    description:
      "Upload any images or videos that show the problem. Providing media helps the maintenance team quickly identify the issue and assess the level of work required before arriving on-site.",
    icon: <ImageUp size={30} />,
    step: 2,
  },
  {
    name: "Location",
    short: "Place where maintenance is needed",

    description:
      "Specify the exact location where the maintenance work is required, such as a room number, building name, or outdoor area. Accurate location information ensures the maintenance team can find and fix the problem quickly.",
    icon: <MapPinned size={30} />,
    step: 3,
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
