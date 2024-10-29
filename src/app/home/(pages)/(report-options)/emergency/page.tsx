import { LatLngExpression } from "leaflet";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import PageDetails from "./page-details";
import { Separator } from "@/components/ui/separator";
import EmergencyCall from "./emergency-call";

const Map = dynamic(() => import("./map"), {
  ssr: false,
  loading: () => <Skeleton className=" h-full w-full" />,
});

const palsuLatlng: LatLngExpression = [9.7769525, 118.7341474];

const page = async () => {
  return (
    <div className="w-full h-screen p-4 md:p-6 space-y-4">
      <div className="flex flex-col xl:flex-row xl:h-full gap-4 pb-4 xl:pb-0">
        <EmergencyCall />
        <div className="h-[20em] xl:h-full w-full relative">
          <Map posix={palsuLatlng} />
        </div>
      </div>
    </div>
  );
};

export default page;
