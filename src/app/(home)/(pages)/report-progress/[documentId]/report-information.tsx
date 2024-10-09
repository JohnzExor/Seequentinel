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

  const AdditionalDetails =
    "additionalDetails" in reportData
      ? reportData.additionalDetails
      : reportData.violationDetails;

  const violatorName =
    "violatorName" in reportData ? reportData.violatorName : null;

  const violationDate =
    "violationDate" in reportData ? reportData.violationDate : null;

  const currentStep = steps.findIndex(
    (step) => step.name.toLowerCase() === status.toLowerCase()
  );
  return (
    <>
      <ReportDetails
        documentTitle={reportTypeOrViolation}
        documentId={id}
        createdAt={createdAt}
        documentType={typeHref}
      />
      <ReportStatus currentStep={currentStep} createdAt={createdAt} />
      {typeHref === "hvr" ? (
        <>
          <section>
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <MapPin size={20} />
              <span>Reported Person</span>
            </div>
            <p className=" w-full max-w-[800px] font-medium">{violatorName}</p>
          </section>
          <section>
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <MapPin size={20} />
              <span>When did she/he commit the violation?</span>
            </div>
            <p className=" w-full max-w-[800px] font-medium">
              {violationDate?.toLocaleString()}
            </p>
          </section>
        </>
      ) : null}
      <section>
        <div className="flex items-center gap-1 text-muted-foreground text-sm">
          <MapPin size={20} />
          <span>
            {typeHref === "hvr" ? "Where did it happened?" : "Location"}
          </span>
        </div>
        <p className=" w-full max-w-[800px] font-medium">{location}</p>
      </section>
      <section>
        <div className="flex items-center gap-1 text-muted-foreground text-sm">
          <ReceiptText size={20} />
          <span>Additional Details</span>
        </div>
        <p className=" w-full max-w-[800px] font-medium">{AdditionalDetails}</p>
      </section>
      <FilesPreview files={mediaOrEvidence} />
    </>
  );
};

export default ReportInformation;
