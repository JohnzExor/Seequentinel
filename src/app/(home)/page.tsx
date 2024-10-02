import ReportingOptions from "./report-options";

const page = () => {
  return (
    <div className="p-3 md:p-0">
      <div className="-space-y-1 md:hidden mb-4">
        <h1 className=" text-xl font-bold">Report Progress</h1>
        <span className="text-sm text-muted-foreground">
          Choose the type of report
        </span>
      </div>
      <ReportingOptions />
    </div>
  );
};

export default page;
