import { Separator } from "@/components/ui/separator";
import clsx from "clsx";
import { ISteps } from "./steps";

const Stepper = ({
  currentStep,
  stepDetails,
}: {
  currentStep: number;
  stepDetails: ISteps[];
}) => {
  return (
    <>
      {stepDetails.map(({ name, description, icon }, index) => (
        <li key={index} className=" w-full">
          <div className="flex flex-col gap-4">
            <div className="flex items-center">
              <div
                className={clsx(
                  " bg-muted-foreground rounded-full p-2 md:p-3 text-white",
                  {
                    " bg-primary": currentStep >= index,
                  }
                )}
              >
                {icon}
              </div>
              <Separator
                className={clsx(" h-1 bg-muted-foreground", {
                  hidden: index >= stepDetails.length - 1,
                  " bg-primary": currentStep > index,
                })}
              />
            </div>
            <p
              className={clsx(
                "hidden xl:block w-[100px] font-semibold text-sm",
                { " text-muted-foreground": currentStep < index }
              )}
            >
              {name} <br />{" "}
              <span className=" font-normal text-sm text-muted-foreground">
                {description}
              </span>
            </p>
          </div>
        </li>
      ))}
    </>
  );
};

export default Stepper;
