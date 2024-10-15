import { getAllAdminUseCase } from "@/use-cases/user";
import { columns } from "./columns";
import AddUser from "./add-user";
import { DataTable } from "../data-table";

const page = async () => {
  const data = await getAllAdminUseCase();
  return (
    <>
      <div>
        <h1 className=" text-xl font-bold">List of Admins</h1>
        <p className="text-sm text-muted-foreground">Updated {Date()}</p>
      </div>
      <AddUser />
      <DataTable columns={columns} data={data} />
    </>
  );
};

export default page;