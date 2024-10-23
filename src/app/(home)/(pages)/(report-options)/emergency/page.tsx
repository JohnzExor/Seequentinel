import { LatLngExpression } from "leaflet";
import CurrentLocation from "./current-location";
import EmergencyCall from "./emergency-call";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { DataProvider } from "./data-provider";
import PageDetails from "./page-details";
import { Separator } from "@/components/ui/separator";

const Map = dynamic(() => import("./map"), {
  ssr: false,
  loading: () => <Skeleton className=" h-full w-full" />,
});

const palsuLatlng: LatLngExpression = [9.7769525, 118.7341474];

const page = async () => {
  return (
    <div className="w-full h-screen p-4 md:p-6 space-y-4">
      <PageDetails />
      <Separator className=" w-full" />
      <DataProvider>
        <EmergencyCall />
        <CurrentLocation />
        <div className="h-full max-h-[20em] md:max-h-[40em] w-full">
          <Map posix={palsuLatlng} />
        </div>
      </DataProvider>
    </div>
  );
};

export default page;
