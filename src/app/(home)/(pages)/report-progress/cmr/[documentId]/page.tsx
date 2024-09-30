import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import ReportInformation from "./report-information";
import { Suspense } from "react";
import HomeLoading from "@/app/(home)/loader";

const page = ({ params }: { params: Params }) => {
  const { documentId } = params;

  return (
    <div className=" p-4 md:p-8 space-y-6 md:space-y-12">
      <Suspense fallback={<HomeLoading />}>
        <ReportInformation documentId={documentId} />
      </Suspense>
    </div>
  );
};

export default page;
