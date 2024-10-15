import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import ReportInformation from "./report-information";
import { getUserReportByIdUseCase } from "@/use-cases/report";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Reports } from "@prisma/client";

const page = async ({ params }: { params: Params }) => {
  const { documentId } = params;
  let data: Reports = {} as Reports;

  try {
    const session = await getServerSession(authOptions);
    const res = await getUserReportByIdUseCase(documentId);
    data = res as Reports;

    if (!data || (data && session?.user.id !== data.userId)) {
      notFound();
    }
  } catch (error: any) {
    console.error(error.message);
  }

  return (
    <div className=" p-4 md:p-8 space-y-6 md:space-y-8">
      <ReportInformation data={data} />
    </div>
  );
};

export default page;
