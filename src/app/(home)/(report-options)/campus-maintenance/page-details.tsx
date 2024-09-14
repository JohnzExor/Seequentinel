import { ConstructionIcon } from "lucide-react";

const PageDetails = () => {
  return (
    <div className=" space-y-2 w-full">
      <h1 className=" text-4xl font-semibold flex items-center gap-2">
        Campus Maintenance Request
        <ConstructionIcon size={30} className=" text-primary" />
      </h1>
      <p className=" text-muted-foreground">
        The Campus Maintenance Request page allows students, faculty, and staff
        to report any issues or repairs needed on campus facilities. Submit
        requests for quick and efficient resolution to ensure the campus remains
        safe and functional for everyone.
      </p>
    </div>
  );
};

export default PageDetails;
