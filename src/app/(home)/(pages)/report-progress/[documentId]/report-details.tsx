import { Button } from "@/components/ui/button";
import { ConstructionIcon, FileText, FileX } from "lucide-react";

const ReportDetails = ({
  documentTitle,
  documentId,
  createdAt,
}: {
  documentTitle: string;
  documentId: string;
  createdAt: Date;
}) => {
  return (
    <section className="flex justify-between">
      <div>
        <div className=" text-muted-foreground flex items-center gap-1">
          <ConstructionIcon size={20} />
          <span>Campus Maintenance Request</span>
        </div>
        <h1 className="text-2xl md:text-4xl font-bold">{documentTitle}</h1>
        <div className="text-sm text-muted-foreground mt-1">
          <span>ID: {documentId}</span>
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
  );
};

export default ReportDetails;
