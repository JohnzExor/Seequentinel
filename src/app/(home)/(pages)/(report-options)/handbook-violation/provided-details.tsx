import { fileUrl } from "@/lib/storage";
import { handbookViolationSchema } from "@/lib/zod";
import {
  Camera,
  FileText,
  Loader,
  MapPin,
  Trash,
  User,
  UserPen,
} from "lucide-react";
import Image from "next/image";
import { z } from "zod";

const ProvidedDetails = ({
  values,
}: {
  values: z.infer<typeof handbookViolationSchema>;
}) => {
  const {
    evidence,
    status,
    violation,
    location,
    violationDate,
    violationDetails,
    violatorName,
  } = values;

  const inputs = [
    { name: "Status", value: status, icon: <Loader size={15} /> },
    { name: "Violation", value: violation, icon: <FileText size={15} /> },
    { name: "ViolatorName", value: violatorName, icon: <UserPen size={15} /> },

    {
      name: "Violation Date",
      value: violationDate,
      icon: <Camera size={15} />,
    },
    { name: "Location", value: location, icon: <MapPin size={15} /> },
    {
      name: "Violation Details",
      value: violationDetails,
      icon: <Camera size={15} />,
    },
    { name: "Media", value: evidence, icon: <Camera size={15} /> },
  ];
  return (
    <div className=" space-y-4">
      {inputs.map(({ name, value, icon }, index) => (
        <div key={index}>
          <span className="flex items-center gap-1 text-muted-foreground text-sm">
            {icon}
            {name}
          </span>
          {value === evidence ? (
            <div className=" grid grid-cols-4 gap-2">
              {evidence.length > 0 ? (
                evidence.map((path, index) => (
                  <div
                    className="relative rounded-xl border border-primary mt-1"
                    key={index}
                  >
                    <Image
                      src={fileUrl + path}
                      width={100}
                      height={100}
                      alt="Rounded picture"
                      className="rounded-xl object-cover"
                    />
                  </div>
                ))
              ) : (
                <span>No evidence attachments</span>
              )}
            </div>
          ) : (
            <h1 className=" font-medium">
              {value === violationDate
                ? violationDate.toLocaleString()
                : value.toString()}
            </h1>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProvidedDetails;
