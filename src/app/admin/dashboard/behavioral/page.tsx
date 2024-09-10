import { DataTable } from "../data-table";
import { columns } from "./columns";
import { getAllReportsUseCase } from "@/use-cases/behaviors";

const page = async () => {
  const data = await getAllReportsUseCase();

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
