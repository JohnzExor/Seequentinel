import { Separator } from "@/components/ui/separator";
import ReportingOptions from "./report-options";

const page = () => {
  return (
    <div>
      <div className="space-y-0.5 p-6 md:p-10 md:hidden">
        <h2 className="text-2xl font-bold tracking-tight">Report options</h2>
        <p className="text-muted-foreground">
          Select the type of report you&apos;d like to submit
        </p>
      </div>
      <ReportingOptions />
    </div>
  );
};

export default page;
