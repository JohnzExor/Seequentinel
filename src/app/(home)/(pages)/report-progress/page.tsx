import { Suspense } from "react";
import ReportsTab from "./reports-tab";
import HomeLoading from "../../loader";
import { Separator } from "@/components/ui/separator";

const page = async () => {
  return (
    <div className=" p-6 md:p-10 space-y-4 w-full">
      <Suspense fallback={<HomeLoading />}>
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Report Progress</h2>
          <p className="text-muted-foreground">
            View all your reports and track their current status.
          </p>
        </div>
        <Separator className="my-6" />
        <ReportsTab />
      </Suspense>
    </div>
  );
};

export default page;
