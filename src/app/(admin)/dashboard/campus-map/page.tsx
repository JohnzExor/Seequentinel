import { getAllEmergenciesOnTheMapUseCase } from "@/use-cases/report";
import { Reports } from "@prisma/client";
import EmergencyList from "./emergency-list";
import { DataProvider } from "./data-provider";
import { LatLngExpression } from "leaflet";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const Map = dynamic(() => import("./map"), {
  ssr: false,
  loading: () => <Skeleton className=" h-full w-full" />,
});

const palsuLatlng: LatLngExpression = [9.7769525, 118.7341474];

const page = async () => {
  let data: Reports[] = [];

  try {
    const res = await getAllEmergenciesOnTheMapUseCase();
    data = res;
  } catch (error: any) {
    console.error(error.message);
  }
  return (
    <div className="flex justify-center h-screen w-full -m-4 md:-m-10">
      <DataProvider emergencyData={data}>
        <EmergencyList />
        <Map posix={palsuLatlng} />
      </DataProvider>
    </div>
  );
};

export default page;
