"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import useResizeObserver from "use-resize-observer";

try {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
} catch {
  throw new Error("Error getting worker");
}

const PDFPreview = () => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const { ref, width = 1, height = 1 } = useResizeObserver<HTMLDivElement>();

  const prevPage = () => setPageNumber((prev) => prev - 1);
  const nextPage = () => setPageNumber((prev) => prev + 1);

  return (
    <div ref={ref} className="flex flex-col w-full shadow-xl rounded-xl h-full">
      <span className="text-sm text-muted-foreground p-2 md:hidden">
        Page {pageNumber} / {numPages}
      </span>
      <Document
        file="/pdf/guidelines.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
        loading={""}
      >
        <Page
          pageNumber={pageNumber}
          width={width}
          loading={<Skeleton className=" w-full h-full"></Skeleton>}
          renderAnnotationLayer={false}
        />
      </Document>
      <div className="flex items-center justify-between p-4 bg-muted mt-auto">
        <Button
          variant={"secondary"}
          disabled={pageNumber <= 1}
          onClick={prevPage}
        >
          Previous Page
        </Button>
        <span className="text-sm text-muted-foreground hidden md:block">
          Page {pageNumber} / {numPages}
        </span>
        <Button disabled={pageNumber >= numPages} onClick={nextPage}>
          Next Page
        </Button>
      </div>
    </div>
  );
};

export default PDFPreview;
