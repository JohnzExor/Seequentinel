import { getAllAdminUseCase } from "@/use-cases/user";
import { columns } from "./columns";
import AddUser from "./add-user";
import { DataTable } from "../data-table";
import { User } from "@prisma/client";

const page = async () => {
  let data: User[] = [];

  try {
    const res = await getAllAdminUseCase();
    data = res;
  } catch (error: any) {
    console.error(error.message);
  }
  return (
    <div className=" p-4 md:p-7 xl:p-10 ">
      <div>
        <h1 className=" text-xl font-bold">List of Admins</h1>
        <p className="text-sm text-muted-foreground">Updated {Date()}</p>
      </div>
      <AddUser />
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default page;
