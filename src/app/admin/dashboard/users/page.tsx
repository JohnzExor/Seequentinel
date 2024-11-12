import { columns } from "./columns";
import { DataTable } from "./data-table";
import AddUser from "./add-user";
import { User } from "@prisma/client";
import { getAllUsersUseCase } from "@/use-cases/users";

const page = async () => {
  let data: User[] = [];
  let error;

  try {
    data = await getAllUsersUseCase();
  } catch (err) {
    console.error(err);
    error = "Error fetching data";
  }
  return (
    <div className="p-4 md:p-7 xl:p-10">
      <div>
        <h1 className=" text-xl font-bold">Users</h1>
        <p className="text-sm text-muted-foreground">Updated {Date()}</p>
      </div>
      <AddUser />
      {!error ? <DataTable data={data} columns={columns} /> : error}
    </div>
  );
};

export default page;
