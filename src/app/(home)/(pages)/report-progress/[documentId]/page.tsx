import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import ReportInformation from "./report-information";
import { getUserReportByIdUseCase } from "@/use-cases/report";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const page = async ({ params }: { params: Params }) => {
  const { documentId } = params;
  const session = await getServerSession(authOptions);
  const data = await getUserReportByIdUseCase(documentId);
  if (!data || (data && session?.user.id !== data.userId)) {
    notFound();
  }

  return (
    <div className=" p-4 md:p-8 space-y-6 md:space-y-8">
      <ReportInformation data={data} />
    </div>
  );
};

export default page;
