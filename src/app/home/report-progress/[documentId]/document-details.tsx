"use client";

import React from "react";
import { Reports } from "@prisma/client";
import {
  Book,
  CalendarClock,
  ConstructionIcon,
  MapPin,
  ReceiptText,
  UserPen,
  Waypoints,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Stepper, { steps } from "./stepper";
import FilesPreview from "./files-preview";
import ArchiveReport from "./archive-report";

const titles = {
  CampusMaintenance: "Campus Maintenance Request",
  HandbookViolation: "Handbook Violation Report",
};

const icons = {
  CampusMaintenance: <ConstructionIcon size={20} />,
  HandbookViolation: <Book size={20} />,
};

const DocumentDetails = ({ data }: { data: Reports }) => {
  const {
    id,
    createdAt,
    reportType,
    problemType,
    status,
    details,
    updatedAt,
    assginedUserId,
    violationDate,
    violatorName,
    location,
    attachments,
  } = data;

  const currentStep = steps.findIndex(
    (step) => step.name.toLowerCase() === status?.toLowerCase()
  );
  return (
    <>
      <section className="flex justify-between">
        <div className="flex flex-col">
          <div className="flex gap-1 items-center text-muted-foreground">
            {icons[reportType]}
            <span className=" text-lg">{titles[reportType]}</span>
          </div>
          <h1 className="text-4xl font-bold -mt-2">{problemType}</h1>
          <span className="text-muted-foreground text-sm mt-2">Id: {id}</span>
          <span className="text-muted-foreground text-sm">
            Created {createdAt.toLocaleString()}
          </span>
          <Button variant={"outline"} className="w-fit">
            Download Report
          </Button>
        </div>
        <ArchiveReport id={id} />
      </section>

      <section className="bg-muted rounded-xl p-4 space-y-2">
        <div className="flex items-center gap-1 text-muted-foreground">
          <Waypoints size={20} />
          <span>Report Status</span>
        </div>
        <div>
          <div className="flex flex-col md:flex-row gap-2">
            <span className="font-medium">
              Assigned to:{" "}
              <Badge>{assginedUserId ? assginedUserId : "Pending"}</Badge>
            </span>
            <span className="font-medium text-muted-foreground">
              Updated:{" "}
              <Badge className="bg-muted-foreground">
                {updatedAt.toLocaleString()}
              </Badge>
            </span>
          </div>
        </div>
        <Stepper currentStep={currentStep} />
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

export default DocumentDetails;
