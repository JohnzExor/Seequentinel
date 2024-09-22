import ReportingOptions from "./report-options";

const page = () => {
  return (
    <div className="p-3 md:p-0">
      <div className="-space-y-1 md:hidden mb-4">
        <h1 className=" text-2xl font-semibold">Report Page</h1>
        <p className="text-sm text-muted-foreground">
          Choose what type of report
        </p>
      </div>
      <ReportingOptions />
    </div>
  );
};

export default page;
