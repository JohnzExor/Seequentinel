import { getUserReportByIdUseCase as cmReportByUser } from "@/use-cases/campus-maintenance";
import { getUserReportByIdUseCase as hvReportByUser } from "@/use-cases/handbook-violation";

import { steps } from "./steps";
import { MapPin, ReceiptText } from "lucide-react";
import FilesPreview from "./files-preview";
import ReportStatus from "./report-status";
import ReportDetails from "./report-details";
import { notFound } from "next/navigation";

const ReportInformation = async ({
  documentId,
  typeHref,
}: {
  documentId: string;
  typeHref: "hvr" | "cmr";
}) => {
  const fetchers = {
    cmr: cmReportByUser,
    hvr: hvReportByUser,
  };

  const reportData = await fetchers[typeHref](documentId);
  if (!reportData) {
    notFound();
  }
  const { id, createdAt, location, status } = reportData;

  const mediaOrEvidence =
    "media" in reportData ? reportData.media : reportData.evidence;

  const reportTypeOrViolation =
    "type" in reportData ? reportData.type : reportData.violation;

  const currentStep = steps.findIndex(
    (step) => step.name.toLowerCase() === status.toLowerCase()
  );
  return (
    <>
      <ReportDetails
        documentTitle={reportTypeOrViolation}
        documentId={id}
        createdAt={createdAt}
      />
      <ReportStatus currentStep={currentStep} createdAt={createdAt} />
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
      <FilesPreview files={mediaOrEvidence} />
    </>
  );
};

export default ReportInformation;
