import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import ReportInformation from "./report-information";
import { getUserReportByIdUseCase } from "@/use-cases/report";
import { notFound } from "next/navigation";

const page = async ({ params }: { params: Params }) => {
  const { documentId } = params;
  const data = await getUserReportByIdUseCase(documentId);
  if (!data) {
    notFound();
  }

  return (
    <div className="space-y-6 md:space-y-8">
      <ReportInformation data={data} />
    </div>
  );
};

export default page;
