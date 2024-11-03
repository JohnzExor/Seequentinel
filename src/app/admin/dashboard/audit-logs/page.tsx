import { AuditLog } from "@prisma/client";
import { DataTable } from "../data-table";
import { columns } from "./columns";
import { findAllAuditLogsUseCase } from "@/use-cases/audit-logs";

const page = async () => {
  let data: AuditLog[] = [];

  try {
    const res = await findAllAuditLogsUseCase();
    data = res;
  } catch (error: any) {
    console.error(error.message);
  }
  return (
    <div className=" p-4 md:p-7 xl:p-10">
      <div>
        <h1 className=" text-xl font-bold">Audit Logs</h1>
        <p className="text-sm text-muted-foreground">Updated {Date()}</p>
      </div>
      <DataTable data={data} columns={columns} />
    </div>
  );
};

export default page;
