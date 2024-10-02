import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import ReportInformation from "./report-information";
import { Suspense } from "react";
import HomeLoading from "@/app/(home)/loader";
import { notFound } from "next/navigation";

const page = ({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { documentId } = params;
  const { type } = searchParams as { type: "cmr" | "hvr" };

  if (type !== "cmr" && type !== "hvr") {
    notFound();
  }

  return (
    <div className=" p-4 md:p-8 space-y-6 md:space-y-12">
      <Suspense fallback={<HomeLoading />}>
        <ReportInformation documentId={documentId} typeHref={type} />
      </Suspense>
    </div>
  );
};

export default page;
