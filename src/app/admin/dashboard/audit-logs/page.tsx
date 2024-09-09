import { DataTable } from "../data-table";
import { columns } from "./columns";
import { findAllAuditLogsUseCase } from "@/use-cases/audit-logs";

const page = async () => {
  const data = await findAllAuditLogsUseCase();

  return (
    <div>
      <div>
        <h1 className=" text-xl font-bold">Audit Logs</h1>
        <p className="text-sm text-muted-foreground">Updated {Date()}</p>
      </div>
      <DataTable data={data} columns={columns} />
    </div>
  );
};

export default page;
