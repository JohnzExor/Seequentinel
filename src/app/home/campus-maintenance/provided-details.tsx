import { fileUrl } from "@/lib/storage";
import { reportSchema } from "@/lib/zod";
import { Camera, ClipboardPlus, FileText, Loader, MapPin } from "lucide-react";
import Image from "next/image";
import { z } from "zod";

const ProvidedDetails = ({
  values,
  isUploading,
}: {
  values: z.infer<typeof reportSchema>;
  isUploading: boolean;
}) => {
  const { problemType, attachments, location, details } = values;

  const inputs = [
    { name: "Status", value: "Request", icon: <Loader size={15} /> },
    { name: "Type", value: problemType, icon: <FileText size={15} /> },
    { name: "Location", value: location, icon: <MapPin size={15} /> },
    {
      name: "Additional Details",
      value: details,
      icon: <ClipboardPlus size={15} />,
    },

    { name: "Attachments", value: attachments, icon: <Camera size={15} /> },
  ];

  return (
    <div className=" space-y-4">
      {inputs.map(({ name, value, icon }, index) => (
        <div key={index}>
          <span className="flex items-center gap-1 text-muted-foreground text-sm">
            {icon}
            {name}
          </span>
          {value === attachments ? (
            <div className=" grid grid-cols-4 gap-2">
              {attachments.length > 0 ? (
                attachments.map((path, index) => (
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
                <span>
                  {isUploading ? "Uploading..." : "No media attachments"}
                </span>
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
