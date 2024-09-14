import { authOptions } from "@/lib/auth";
import { getUserReportsUseCase as getHandbookRequestData } from "@/use-cases/campus-maintenance";
import { getUserReportsUseCase as getBehavioralData } from "@/use-cases/handbook-violation";
import { getUserReportsUseCase as getEmergenciesData } from "@/use-cases/emergencies";

import { getServerSession } from "next-auth";
import { TriangleAlert, Users, Warehouse } from "lucide-react";
import { Suspense } from "react";
import CampusRequestCard from "./campus-request-card";
import BehavioralCard from "./behavioral-card";
import EmergenciesCard from "./emergencies-card";

const page = async () => {
  const session = await getServerSession(authOptions);

  const userId = session?.user.id.toString() as string;

  const handbookRequestData = await getHandbookRequestData(userId);

  const behavioralData = await getBehavioralData(userId);

  const emergenciesData = await getEmergenciesData(userId);

  return (
    <div className="p-8 space-y-4 w-full">
      <div>
        <h1 className=" text-xl font-bold">Report Progress</h1>
        <p className="text-sm text-muted-foreground">Updated {Date()}</p>
      </div>
      <div className=" space-y-8">
        <CampusRequestCard
          title="Faulty Facilities"
          icon={<Warehouse />}
          data={handbookRequestData}
        />
        <BehavioralCard
          title="Behaviors"
          icon={<Users />}
          data={behavioralData}
        />
        <EmergenciesCard
          title="Emergencies"
          icon={<TriangleAlert />}
          data={emergenciesData}
        />
      </div>
    </div>
  );
};

export default page;
