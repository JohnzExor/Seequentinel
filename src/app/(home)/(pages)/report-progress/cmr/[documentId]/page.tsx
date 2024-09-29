import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import ReportInformation from "./report-information";
import { Suspense } from "react";
import HomeLoading from "@/app/(home)/loader";

const page = ({ params }: { params: Params }) => {
  const { documentId } = params;

  return (
    <>
      <Suspense fallback={<HomeLoading />}>
        <ReportInformation documentId={documentId} />
      </Suspense>
    </>
  );
};

export default page;
