import { Skeleton } from "@/components/ui/skeleton";
import EmergencyCall from "./emergency-call";
import dynamic from "next/dynamic";

const RealtimeMap = dynamic(() => import("./realtime-map"), {
  ssr: false,
  loading: () => <Skeleton className=" h-full w-full" />,
});

const page = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center h-screen">
      <EmergencyCall />
      <RealtimeMap posix={[9.7769525, 118.7341474]} />
    </div>
  );
};

export default page;
