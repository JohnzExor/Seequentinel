import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import EmergencyCall from "./emergency-call";
import { CallStatusEnum, Reports } from "@prisma/client";
import { getCurrentCallStatusUseCase } from "@/use-cases/report";

const RealtimeMap = dynamic(() => import("./realtime-map"), {
  ssr: false,
  loading: () => <Skeleton className=" h-full w-full" />,
});

const page = async () => {
  let currentStatus: CallStatusEnum = "None";
  let data: Reports = {} as Reports;

  try {
    const session = await getServerSession(authOptions);
    if (session?.user) {
      const res = await getCurrentCallStatusUseCase(session?.user.id);
      if (res?.callStatus) {
        currentStatus = res.callStatus;
        data = res;
      }
    }
  } catch (error: any) {
    console.error(error.message);
  }
  return (
    <div className="w-full flex flex-col items-center justify-center h-screen">
      <EmergencyCall status={currentStatus} callData={data} />
      <RealtimeMap posix={[9.776904, 118.733746]} />
    </div>
  );
};

export default page;
