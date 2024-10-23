import { LatLngExpression } from "leaflet";
import CurrentLocation from "./current-location";
import EmergencyCall from "./emergency-call";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { DataProvider } from "./data-provider";

const Map = dynamic(() => import("./map"), {
  ssr: false,
  loading: () => <Skeleton className=" h-full w-full" />,
});

const palsuLatlng: LatLngExpression = [9.7769525, 118.7341474];

const page = async () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <DataProvider>
        <CurrentLocation />
        <EmergencyCall />
        <Map posix={palsuLatlng} />
      </DataProvider>
    </div>
  );
};

export default page;
