import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getUserReportByIdUseCase } from "@/use-cases/handbook-violation";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Stepper from "./stepper";
import { steps } from "./steps";
import { CalendarDays, FileText, User } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const page = async ({ params }: { params: Params }) => {
  const { documentId } = params;
  const { status, violation, evidence, location, id, createdAt } =
    await getUserReportByIdUseCase(documentId);
  return (
    <Card className="md:m-6 m-1 p-6">
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
          <Stepper currentStep={2} stepDetails={steps} />
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
          {evidence ? (
            <div className=" w-full md:w-[400px] h-[400px] relative">
              <Image
                src={`https://mefpvvgnqqvpbqcxloyx.supabase.co/storage/v1/object/public/evidences/${evidence}`}
                alt={evidence}
                fill
                className=" object-cover rounded-xl"
              />
            </div>
          ) : null}
        </div>
      </div>
    </Card>
  );
};

export default page;
