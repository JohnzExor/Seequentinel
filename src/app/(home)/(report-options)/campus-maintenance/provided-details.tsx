import { fileUrl } from "@/lib/storage";
import { campusMaintenanceSchema } from "@/lib/zod";
import { Camera, FileText, Loader, MapPin, Trash, User } from "lucide-react";
import Image from "next/image";
import { z } from "zod";

const ProvidedDetails = ({
  values,
}: {
  values: z.infer<typeof campusMaintenanceSchema>;
}) => {
  const { type, media, status, location } = values;

  const inputs = [
    { name: "Status", value: status, icon: <Loader size={15} /> },
    { name: "Type", value: type, icon: <FileText size={15} /> },
    { name: "Location", value: location, icon: <MapPin size={15} /> },
    { name: "Media", value: media, icon: <Camera size={15} /> },
  ];
  return (
    <div className=" space-y-4">
      {inputs.map(({ name, value, icon }, index) => (
        <div key={index}>
          <span className="flex items-center gap-1 text-muted-foreground text-sm">
            {icon}
            {name}
          </span>
          {value === media ? (
            <div className=" grid grid-cols-4 gap-2">
              {media.length > 0 ? (
                media.map((path, index) => (
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
                <span>No media attachments</span>
              )}
            </div>
          ) : (
            <h1 className=" font-medium">{value}</h1>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProvidedDetails;
