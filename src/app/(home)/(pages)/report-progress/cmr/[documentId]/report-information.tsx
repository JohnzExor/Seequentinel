import { Badge } from "@/components/ui/badge";
import { getUserReportByIdUseCase } from "@/use-cases/campus-maintenance";
import Stepper from "./stepper";
import { steps } from "./steps";
import {
  ArrowBigDownDash,
  CalendarArrowUp,
  ConstructionIcon,
  FileText,
  FileX,
  MapPin,
  ReceiptText,
  User,
  Waypoints,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { fileUrl } from "@/lib/storage";

const ReportInformation = async ({ documentId }: { documentId: string }) => {
  const { status, type, location, media, id, createdAt } =
    await getUserReportByIdUseCase(documentId);

  const currentStep = steps.findIndex(
    (step) => step.name.toLowerCase() === status.toLowerCase()
  );
  return (
    <>
      <section className="flex justify-between">
        <div>
          <div className=" text-muted-foreground flex items-center gap-1">
            <ConstructionIcon size={20} />
            <span>Campus Maintenance Request</span>
          </div>
          <h1 className=" text-4xl font-bold">{type}</h1>
          <div className="text-sm text-muted-foreground mt-1">
            <span>ID: {id}</span>
            <br />
            <span>Created {createdAt.toLocaleString()}</span>
          </div>
          <Button variant="outline" className="mt-2">
            <FileText className="w-4 h-4 mr-2" />
            Download Report
          </Button>
        </div>
        <Button variant={"destructive"}>
          <FileX className="w-4 h-4 md:mr-2" />
          <span className=" hidden md:block">Delete Report</span>
        </Button>
      </section>
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
      <section className="space-y-2">
        <div className="flex items-center gap-2">
          <MapPin />
          <span className="text-lg font-semibold">Location</span>
        </div>
        <p className=" w-full max-w-[800px]">{location}</p>
      </section>
      <section className=" space-y-2">
        <div className="flex items-center gap-2">
          <ReceiptText />
          <span className="text-lg font-semibold">Additional Details</span>
        </div>
        <p className=" w-full max-w-[800px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
          sollicitudin nunc id sagittis lobortis. Nulla vel lectus ligula.
          Nullam pellentesque ipsum felis, tempus ultricies risus imperdiet eu.
          Donec vel nunc et felis sollicitudin eleifend nec in lacus. Mauris est
          neque, ultrices et ante id, aliquet sagittis turpis.{" "}
        </p>
      </section>
      <section className="space-y-2">
        <div className="flex items-center gap-2">
          <ArrowBigDownDash />
          <span className="text-lg font-semibold">Uploaded Files</span>
        </div>
        <span className="text-sm">
          No. of uploaded files:{" "}
          <span className=" font-bold">{media.length}</span>
        </span>
        <div className=" grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {media.length > 0
            ? media.map((path, index) => (
                <div className="border w-full h-[300px] rounded-xl" key={index}>
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
      </section>
    </>
  );
};

export default ReportInformation;
