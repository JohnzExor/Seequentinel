import { getReportTypeReportsUseCase } from "@/use-cases/report";
import { DataTable } from "../../data-table";
import { columns } from "./columns";
import { Reports } from "@prisma/client";

const page = async () => {
  let data: Reports[] = [];

  try {
    const res = await await getReportTypeReportsUseCase("CampusMaintenance");
    data = res;
  } catch (error: any) {
    console.error(error.message);
  }
  return (
    <div>
      <div>
        <h1 className=" text-xl font-bold">Campus Mentenance Request</h1>
        <p className="text-sm text-muted-foreground">Updated {Date()}</p>
      </div>
      <DataTable data={data} columns={columns} />
    </div>
  );
};

export default page;
