import ReportsTab from "./reports-tab";

const page = async () => {
  return (
    <div className=" p-4 md:p-8 space-y-4 w-full">
      <div>
        <h1 className=" text-xl font-bold">Report Progress</h1>
        <p className="text-sm text-muted-foreground">Updated {Date()}</p>
      </div>
      <ReportsTab />
    </div>
  );
};

export default page;
