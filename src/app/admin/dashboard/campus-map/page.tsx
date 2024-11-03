import { DataProvider } from "./data-provider";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { Emergencies } from "@prisma/client";
import { LatLngExpression } from "leaflet";
import { getAllEmergenciesUseCase } from "@/use-cases/emergencies";
import EmergencyList from "./emergency-list";

const Map = dynamic(() => import("./map"), {
  ssr: false,
  loading: () => <Skeleton className=" h-full w-full" />,
});

const palsuLatlng: LatLngExpression = [9.7769525, 118.7341474];

const page = async () => {
  let data: Emergencies[] = [];

  try {
    const res = await getAllEmergenciesUseCase();
    data = res;
  } catch (error: any) {
    console.error(error.message);
  }

  return (
    <div className="w-full h-screen p-4 md:p-7 space-y-4">
      <DataProvider emergencyData={data}>
        <div className="flex flex-col xl:flex-row xl:h-full gap-4 pb-4 xl:pb-0">
          <EmergencyList />
          <div className="h-[20em] xl:h-full w-full relative">
            <Map posix={palsuLatlng} />
          </div>
        </div>
      </DataProvider>
    </div>
  );
};

export default page;
