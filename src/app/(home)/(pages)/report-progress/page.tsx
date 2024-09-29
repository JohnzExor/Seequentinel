import { Suspense } from "react";
import ReportsTab from "./reports-tab";
import HomeLoading from "../../loader";

const page = async () => {
  return (
    <div className=" p-4 md:p-8 space-y-4 w-full">
      <div>
        <h1 className=" text-xl font-bold">Report Progress</h1>
        <p className="text-sm text-muted-foreground">Updated {Date()}</p>
      </div>
      <Suspense fallback={<HomeLoading />}>
        <ReportsTab />
      </Suspense>
    </div>
  );
};

export default page;
