import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Download } from "lucide-react";
import dynamic from "next/dynamic";

const PDFPreview = dynamic(() => import("./pdf-preview"), {
  ssr: false,
  loading: () => <Skeleton className=" w-full h-full" />,
});

const page = () => {
  return (
    <div className="flex flex-col xl:flex-row items-center justify-center p-6 gap-4 md:h-screen">
      <div className=" w-full max-w-[800px] space-y-4">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary-foreground">
          Student Handbook Overview
        </h1>
        <p className=" w-full max-w-[700px] text-sm md:text-base">
          The student handbook serves as a comprehensive guide to the policies,
          procedures, and expectations for all students at Palawan State
          University. It covers essential information on academic standards,
          student conduct, campus resources, and services available to support
          your academic journey. By familiarizing yourself with the handbook,
          you will gain a clear understanding of your rights and
          responsibilities as a student. Whether you prefer to view or download
          the handbook for future reference, you can access it through the
          official university portal or directly from the link provided below.
        </p>
        <div className=" w-fit">
          <a href="/pdf/guidelines.pdf" download>
            <Button className="flex items-center gap-1">
              <Download />
              <span>Download PDF</span>
            </Button>
          </a>
        </div>
      </div>
      <div className=" w-full max-w-[600px] h-[600px] md:h-full max-h-[872px] ">
        <PDFPreview />
      </div>
    </div>
  );
};

export default page;
