import { getReportTypeReportsUseCase } from "@/use-cases/report";
import { DataTable } from "../data-table";
import { columns } from "./columns";

const page = async () => {
  const data = await getReportTypeReportsUseCase("HandbookViolation");

  return (
    <div>
      <div>
        <h1 className=" text-xl font-bold">Handbook Violation Report</h1>
        <p className="text-sm text-muted-foreground">Updated {Date()}</p>
      </div>
      <DataTable data={data} columns={columns} />
    </div>
  );
};

export default page;
