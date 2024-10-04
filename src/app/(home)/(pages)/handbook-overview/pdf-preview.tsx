"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import useResizeObserver from "use-resize-observer";

pdfjs.GlobalWorkerOptions.workerSrc =
  "https://unpkg.com/pdfjs-dist@4.4.168/legacy/build/pdf.worker.min.mjs";

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
    <div ref={ref} className=" w-full max-w-[600px] shadow-xl rounded-xl">
      <Document
        file="/pdf/guidelines.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page
          pageNumber={pageNumber}
          width={width}
          loading={<Skeleton className=" w-full h-full"></Skeleton>}
          renderAnnotationLayer={false}
        />
      </Document>
      <div className="flex items-center justify-between p-4 bg-muted">
        <Button
          variant={"secondary"}
          disabled={pageNumber <= 1}
          onClick={prevPage}
        >
          Previous Page
        </Button>
        <span className="text-sm text-muted-foreground">
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
