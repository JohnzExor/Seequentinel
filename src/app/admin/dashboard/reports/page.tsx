import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Reports } from "@prisma/client";
import { getAllReportsUseCase } from "@/use-cases/reports";

const page = async () => {
  let data: Reports[] = [];
  let error;

  try {
    data = await getAllReportsUseCase();
  } catch (err) {
    console.error(err);
    error = "Error fetching data";
  }

  return (
    <div className="p-4 md:p-7 xl:p-10">
      <div>
        <h1 className=" text-xl font-bold">Reports</h1>
        <p className="text-sm text-muted-foreground">Updated {Date()}</p>
      </div>
      {!error ? <DataTable data={data} columns={columns} /> : error}
    </div>
  );
};

export default page;
