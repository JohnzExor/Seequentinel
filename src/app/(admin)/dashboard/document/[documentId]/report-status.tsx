import { Waypoints } from "lucide-react";
import Stepper from "./stepper";
import { steps } from "./steps";
import { Badge } from "@/components/ui/badge";

const ReportStatus = ({
  currentStep,
  updatedAt,
  assigned,
}: {
  currentStep: number;
  updatedAt: Date;
  assigned: string | null;
}) => {
  return (
    <section className=" space-y-1 bg-muted p-4 rounded-xl">
      <div className="flex items-center gap-2 text-muted-foreground text-sm">
        <Waypoints size={20} />
        <span>Report Status</span>
      </div>
      <div className="text-sm flex lg:items-center gap-1 md:gap-3 flex-col lg:flex-row pb-2">
        <div className="flex items-center gap-1 font-medium">
          <span>Assigned to:</span>
          <Badge>{assigned ? assigned : "Pending"}</Badge>
        </div>
        <div className="flex items-center gap-1 font-medium text-muted-foreground">
          <span>Updated:</span>
          <Badge className=" bg-muted-foreground text-white">
            {updatedAt.toLocaleString()}
          </Badge>
        </div>
      </div>

      <ul className="flex gap-10">
        <Stepper currentStep={currentStep} stepDetails={steps} />
      </ul>
      <div className=" xl:hidden">
        {steps.map(({ name, description }, index) =>
          currentStep === index ? (
            <div key={index}>
              <h1 className="font-medium">{name}</h1>
              <p className=" text-sm">{description}</p>
            </div>
          ) : null
        )}
      </div>
    </section>
  );
};

export default ReportStatus;
