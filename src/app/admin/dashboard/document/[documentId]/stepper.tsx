import { Separator } from "@/components/ui/separator";
import clsx from "clsx";
import { ClipboardCheck, ImageUp, ListCheck, MapPinned } from "lucide-react";

export const steps = [
  {
    name: "Request",
    description: "Your request has been submitted and is under review.",
    icon: ListCheck,
  },
  {
    name: "Reviewing",
    description: "The team is reviewing your request and media files.",
    icon: ImageUp,
  },
  {
    name: "Accepted",
    description: "The request is accepted and the location confirmed.",
    icon: MapPinned,
  },
  {
    name: "Completed",
    description: "The issue has been resolved successfully.",
    icon: ClipboardCheck,
  },
];

const Stepper = ({ currentStep }: { currentStep: number }) => {
  return (
    <ul className="flex gap-10">
      {steps.map(({ name, description, icon: Icon }, index) => (
        <li key={index} className=" w-full space-y-2">
          <div className="flex items-center">
            <div
              className={clsx("p-2 md:p-3 rounded-full text-white", {
                "bg-primary": currentStep >= index,
                "bg-muted-foreground": currentStep < index,
              })}
            >
              <Icon size={30} />
            </div>
            <Separator
              className={clsx("h-1", {
                hidden: index >= steps.length - 1,
                "bg-primary": currentStep >= index,
                "bg-muted-foreground": currentStep < index,
              })}
            />
          </div>
          <div
            className={clsx("text-sm hidden xl:block w-[8em]", {
              "text-muted-foreground": currentStep + 1 <= index,
            })}
          >
            <h1 className="font-medium">{name}</h1>
            <p>{description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Stepper;
