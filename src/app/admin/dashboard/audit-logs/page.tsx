import { AuditLog } from "@prisma/client";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getAllAuditLogsUseCase } from "@/use-cases/audit-logs";

const page = async () => {
  let data: AuditLog[] = [];
  let error;

  try {
    data = await getAllAuditLogsUseCase();
  } catch (err) {
    console.error(err);
    error = "Error fetching data";
  }
  return (
    <div className=" p-4 md:p-7 xl:p-10">
      <div>
        <h1 className=" text-xl font-bold">Audit Logs</h1>
        <p className="text-sm text-muted-foreground">Updated {Date()}</p>
      </div>
      {!error ? <DataTable data={data} columns={columns} /> : error}
    </div>
  );
};

export default page;
