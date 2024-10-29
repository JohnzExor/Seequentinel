import { AlertTriangleIcon } from "lucide-react";

const PageDetails = () => {
  return (
    <div className="space-y-2 w-full">
      <h1 className="text-4xl font-semibold flex items-center gap-2">
        Emergency SOS
        <AlertTriangleIcon size={30} className="text-red-600" />
      </h1>
      <p className="text-muted-foreground">
        The Emergency SOS page enables students, faculty, and staff to quickly
        report urgent situations. Use this system to alert emergency services
        and provide crucial information to ensure a rapid response. Stay safe
        and act swiftly in any emergency.
      </p>
    </div>
  );
};

export default PageDetails;
