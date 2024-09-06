import { authOptions } from "@/lib/auth";
import { getUserReportsUseCase } from "@/use-cases/faulty-facilities";
import { getServerSession } from "next-auth";
import ReportCard from "./report-card";
import { TriangleAlert, Users, Warehouse } from "lucide-react";

const page = async () => {
  const session = await getServerSession(authOptions);

  const faultyFacilities = await getUserReportsUseCase(
    session?.user.id.toString() as string
  );
  return (
    <div className="p-8 space-y-4 w-full">
      <div>
        <h1 className=" text-xl font-bold">Report Progress</h1>
        <p className="text-sm text-muted-foreground">Updated {Date()}</p>
      </div>
      <div className=" space-y-8">
        <ReportCard
          title="Faulty Facilities"
          icon={<Warehouse />}
          data={faultyFacilities}
        />
        <ReportCard
          title="Behaviors"
          icon={<Users />}
          data={faultyFacilities}
        />
        <ReportCard
          title="Emergencies"
          icon={<TriangleAlert />}
          data={faultyFacilities}
        />
      </div>
    </div>
  );
};

export default page;
