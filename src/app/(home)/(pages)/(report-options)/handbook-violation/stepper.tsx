import { Separator } from "@/components/ui/separator";
import clsx from "clsx";
import { TSteps } from "./steps";

const Stepper = ({
  currentStep,
  stepDetails,
}: {
  currentStep: number;
  stepDetails: TSteps[];
}) => {
  return (
    <ul className="flex md:flex-col gap-10 overflow-x-auto pb-2 md:pb-0">
      {stepDetails.map(({ name, short, icon }, index) => (
        <li key={index} className="w-full">
          <div className=" md:flex justify-between gap-4">
            <p
              className={clsx(
                "hidden md:block w-full font-semibold text-sm text-right",
                { " text-muted-foreground": currentStep < index }
              )}
            >
              {name} <br />{" "}
              <span className=" font-normal text-sm text-muted-foreground">
                {short}
              </span>
            </p>
            <div className="flex md:flex-col items-center">
              <div
                className={clsx(
                  " bg-muted rounded-full p-2 md:p-3 text-white",
                  {
                    " bg-primary": currentStep >= index,
                  }
                )}
              >
                {icon}
              </div>
              <Separator
                className={clsx(" h-1 bg-muted md:hidden", {
                  hidden: index >= stepDetails.length - 1,
                  " bg-primary": currentStep > index,
                })}
              />
              <Separator
                orientation="vertical"
                className={clsx(" w-1 bg-muted", {
                  hidden: index >= stepDetails.length - 1,
                  " bg-primary": currentStep > index,
                })}
              />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Stepper;
