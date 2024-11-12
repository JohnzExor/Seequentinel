import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import DocumentDetails from "./document-details";
import { Reports } from "@prisma/client";
import { getReportUseCase } from "@/use-cases/reports";
import { notFound } from "next/navigation";

const page = async ({ params }: { params: Params }) => {
  const { documentId } = params;

  let data: Reports | null = null;
  let error;

  try {
    data = await getReportUseCase(documentId);
  } catch (err) {
    console.error(err);
    error = "Error fetching data";
  }

  if (!data) notFound();

  return (
    <div className=" p-4 lg:p-10 space-y-6">
      {!error ? <DocumentDetails data={data} /> : error}
    </div>
  );
};

export default page;
