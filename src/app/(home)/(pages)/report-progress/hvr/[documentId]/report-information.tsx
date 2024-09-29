import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getUserReportByIdUseCase } from "@/use-cases/handbook-violation";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Stepper from "./stepper";
import { steps } from "./steps";
import { CalendarDays, FileText, User } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { fileUrl } from "@/lib/storage";

const ReportInformation = async ({ documentId }: { documentId: string }) => {
  const { status, violation, location, evidence, id, createdAt } =
    await getUserReportByIdUseCase(documentId);

  const currentStep = steps.findIndex(
    (step) => step.name.toLowerCase() === status.toLowerCase()
  );
  return (
    <div className="p-4 md:p-8">
      <header className="flex items-center justify-between">
        <div className="flex flex-col items-start gap-4">
          <h1 className="text-4xl font-semibold">{violation}</h1>
          <span className="text-muted-foreground">Report ID:{id}</span>
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Download Report
          </Button>
        </div>
        <Badge>{status}</Badge>
      </header>
      <div className=" mt-10 space-y-4">
        <div className=" space-y-4">
          <h1 className=" text-lg font-semibold">Timeline</h1>
          <Stepper currentStep={currentStep} stepDetails={steps} />
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <CalendarDays />
          <span>Created on {new Date(createdAt).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <User />
          <span>Assigned to John Doe</span>
        </div>
        <div>
          <h1 className=" text-lg font-semibold mt-8">Description</h1>
          <span>
            A minor traffic incident occurred at the intersection of Main St.
            and 5th Ave.
          </span>
        </div>
        <div className=" space-y-2">
          <h1 className=" text-lg font-semibold mt-8">Media</h1>
          <span className="text-sm">
            No. of uploaded files:{" "}
            <span className=" font-bold">{evidence.length}</span>
          </span>
          <div className=" grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
            {evidence.length > 0
              ? evidence.map((path, index) => (
                  <div className="border w-full h-[300px]" key={index}>
                    <div className=" w-full h-full relative">
                      <Image
                        src={`${fileUrl}${path}`}
                        alt={path}
                        fill
                        className=" object-cover rounded-xl"
                      />
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportInformation;
