import { Skeleton } from "@/components/ui/skeleton";
import { getAllEmergenciesOnTheMapUseCase } from "@/use-cases/report";
import { Reports } from "@prisma/client";
import { LatLngExpression } from "leaflet";
import dynamic from "next/dynamic";

const RealtimeMap = dynamic(() => import("./realtime-map"), {
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
    console.error(error);
  }
  return (
    <div className=" -mx-4 -mb-4 mt-2 md:-m-10 flex flex-col items-center">
      <RealtimeMap emergencies={data} posix={palsuLatlng} />
    </div>
  );
};

export default page;
