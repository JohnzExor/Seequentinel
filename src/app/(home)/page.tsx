import ReportingOptions from "./report-options";

const page = () => {
  return (
    <div>
      <div className="-space-y-1 md:hidden p-3">
        <h1 className=" text-xl font-bold">Reporting options</h1>
        <span className="text-sm text-muted-foreground">
          Choose the type of report
        </span>
      </div>
      <ReportingOptions />
    </div>
  );
};

export default page;
