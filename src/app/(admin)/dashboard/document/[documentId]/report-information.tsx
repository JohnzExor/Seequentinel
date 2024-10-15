"use client";

import { steps } from "./steps";
import {
  Book,
  CalendarClock,
  ConstructionIcon,
  FileText,
  MapPin,
  ReceiptText,
  Siren,
  UserPen,
} from "lucide-react";
import FilesPreview from "./files-preview";
import ReportStatus from "./report-status";
import { Button } from "@/components/ui/button";
import { Reports } from "@prisma/client";
import AssignReport from "./assign-report";
import ChangeStatusForm from "./change-status-form";
import { useEffect, useState } from "react";
import supabase from "@/lib/storage";

const titles = {
  CampusMaintenance: "Campus Maintenance Request",
  Emergencies: "Emergency Report Log",
  HandbookViolation: "Handbook Violation Report",
};

const icons = {
  CampusMaintenance: <ConstructionIcon size={20} />,
  Emergencies: <Siren size={20} />,
  HandbookViolation: <Book size={20} />,
};

const ReportInformation = ({ data }: { data: Reports }) => {
  const [reports, setReports] = useState(data);

  useEffect(() => {
    const channel = supabase
      .channel("reports-db-document-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Reports" },
        async (payload) => {
          setReports(payload.new as Reports);
          console.log(data);
          console.log(reports);
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [data, reports, setReports]);

  const {
    id,
    reportType,
    createdAt,
    problemType,
    violatorName,
    violationDate,
    location,
    details,
    attachments,
    status,
    updatedAt,
    assginedUserId,
  } = reports;

  const currentStep = steps.findIndex(
    (step) => step.name.toLowerCase() === status?.toLowerCase()
  );

  return (
    <>
      <section className="flex justify-between">
        <div>
          <div className=" text-muted-foreground flex items-center gap-1">
            {icons[reportType]}
            <span>{titles[reportType]}</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold">{problemType}</h1>
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
        {!assginedUserId ? (
          <AssignReport documentId={id} />
        ) : status ? (
          <ChangeStatusForm oldStatus={status} documentId={id} />
        ) : null}
      </section>
      <ReportStatus
        currentStep={currentStep}
        updatedAt={updatedAt}
        assigned={assginedUserId}
      />
      {reportType === "HandbookViolation" ? (
        <>
          <section>
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <UserPen size={20} />
              <span>Reported Person</span>
            </div>
            <p className=" w-full max-w-[800px] font-medium">{violatorName}</p>
          </section>
          <section>
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <CalendarClock size={20} />
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
            {reportType === "HandbookViolation"
              ? "Where did it happened?"
              : "Location"}
          </span>
        </div>
        <p className=" w-full max-w-[800px] font-medium">{location}</p>
      </section>
      <section>
        <div className="flex items-center gap-1 text-muted-foreground text-sm">
          <ReceiptText size={20} />
          <span>Additional Details</span>
        </div>
        <p className=" w-full max-w-[800px] font-medium">{details}</p>
      </section>
      <FilesPreview files={attachments} />
    </>
  );
};

export default ReportInformation;
