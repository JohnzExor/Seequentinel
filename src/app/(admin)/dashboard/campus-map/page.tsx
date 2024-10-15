import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";

const RealtimeMap = dynamic(() => import("./realtime-map"), {
  ssr: false,
  loading: () => <Skeleton className=" h-full w-full" />,
});

const page = () => {
  return (
    <div className=" -mx-4 -mb-4 mt-2 md:-m-10">
      <RealtimeMap posix={[9.7769525, 118.7341474]} />
    </div>
  );
};

export default page;
