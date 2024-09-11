import { Separator } from "@/components/ui/separator";
import clsx from "clsx";
import { ImageUp, ListCheck, MapPinned } from "lucide-react";

const steps = [
  {
    name: "Details",
    description: "Give the details of the problem",
    icon: <ListCheck />,
    step: 0,
  },
  {
    name: "Photo",
    description: "Provide media files for proof",
    icon: <ImageUp />,
    step: 1,
  },
  {
    name: "Location",
    description: "Place where maintenance is needed",
    icon: <MapPinned />,
    step: 2,
  },
];

const Stepper = ({ currentStep }: { currentStep: number }) => {
  return (
    <div className="flex w-full ">
      {steps.map(({ name, description, icon }, index) => (
        <div
          key={index}
          className={clsx("flex items-start gap-4", {
            " text-muted-foreground":
              index > steps.findIndex((obj) => obj.step === currentStep),
          })}
        >
          <div className="flex flex-col">
            <div className="flex items-center">
              <div
                className={clsx(
                  " w-fit p-3 rounded-full text-white self-center",
                  {
                    " bg-primary": currentStep === index,
                    " bg-muted": currentStep !== index,
                    " text-current":
                      index <=
                      steps.findIndex((obj) => obj.step === currentStep) - 1,
                  }
                )}
              >
                {icon}
              </div>
              <Separator
                className={clsx("w-28", {
                  hidden: index >= steps.length - 1,
                })}
              />
            </div>
            <p className=" font-semibold w-28">
              {name} <br />
              <span className=" text-sm text-muted-foreground font-normal">
                {description}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stepper;
