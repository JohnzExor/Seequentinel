import clsx from "clsx";
import { ISteps } from "./steps";

const StepsText = ({
  currentStep,
  stepDetails,
}: {
  currentStep: number;
  stepDetails: ISteps[];
}) => {
  return (
    <div>
      {stepDetails.map(({ name, description, icon, step }, index) => (
        <div
          key={index}
          className={clsx(" space-y-2", { hidden: currentStep != index })}
        >
          <span className="text-muted-foreground text-sm">
            Step {currentStep + 1}/{stepDetails.length}
          </span>
          <h1 className="flex items-center gap-2 text-2xl font-bold">
            {icon}
            {name}
          </h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      ))}
    </div>
  );
};

export default StepsText;
