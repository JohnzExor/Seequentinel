import { Skeleton } from "@/components/ui/skeleton";
import { LatLngExpression } from "leaflet";
import dynamic from "next/dynamic";
import { Emergencies } from "@prisma/client";
import EmergenciesTab from "./emergencies-tab";
import { getAllEmergenciesUseCase } from "@/use-cases/emergencies";

const LeafletMap = dynamic(() => import("./leaflet-map"), {
  ssr: false,
  loading: () => <Skeleton className=" h-full w-full" />,
});

const palsuLatlng: LatLngExpression = [9.7769525, 118.7341474];

const page = async () => {
  let data: {
    emergencies: Emergencies[];
    pendings: Emergencies[];
    active: Emergencies[];
    completed: Emergencies[];
  } = { emergencies: [], pendings: [], active: [], completed: [] };
  let error;

  try {
    data = await getAllEmergenciesUseCase();
  } catch (err) {
    console.error(err);
    error = "Error fetching data";
  }

  return (
    <div className="h-screen w-full">
      <div className="flex flex-col xl:flex-row xl:h-full">
        {!error ? <EmergenciesTab data={data} /> : error}
        <div className="h-[20em] p-4 xl:p-0 xl:h-full w-full relative">
          <LeafletMap emergencies={data.pendings} posix={palsuLatlng} />
        </div>
      </div>
    </div>
  );
};

export default page;
