import { Separator } from "@/components/ui/separator";
import PageDetails from "./page-details";
import { DataProvider } from "./data-provider";
import EmergencyList from "./emergency-list";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { Reports } from "@prisma/client";
import { getAllEmergenciesOnTheMapUseCase } from "@/use-cases/report";
import { LatLngExpression } from "leaflet";
import PeerAudioCall from "./peer-audio-call";

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
    <div className="w-full h-screen space-y-4">
      <PageDetails />
      <Separator className=" w-full" />
      <DataProvider emergencyData={data}>
        <div className="flex flex-col lg:flex-row items-start gap-4 h-full">
          <PeerAudioCall />
          <div className="h-full max-h-[20em] md:max-h-[50em] w-full pb-6">
            <Map posix={palsuLatlng} />
          </div>
        </div>
      </DataProvider>
    </div>
  );
};

export default page;
