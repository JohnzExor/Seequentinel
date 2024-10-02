import { CalendarArrowUp, User, Waypoints } from "lucide-react";
import Stepper from "./stepper";
import { steps } from "./steps";

const ReportStatus = ({
  currentStep,
  createdAt,
}: {
  currentStep: number;
  createdAt: Date;
}) => {
  return (
    <section className="space-y-2">
      <div className="flex items-center gap-2">
        <Waypoints />
        <span className="text-lg font-semibold">Report Status</span>
      </div>
      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        <User size={20} />
        <span>Assigned to: Still pending</span>
      </div>
      <div className="flex items-center gap-1 text-sm text-muted-foreground pb-2">
        <CalendarArrowUp size={20} />
        <span>Updated {createdAt.toLocaleString()}</span>
      </div>
      <ul className="flex gap-10">
        <Stepper currentStep={currentStep} stepDetails={steps} />
      </ul>
    </section>
  );
};

export default ReportStatus;
