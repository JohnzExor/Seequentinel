import { Book, ConstructionIcon, Siren } from "lucide-react";

import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import clsx from "clsx";

const options = [
  {
    name: "Campus Maintenance Request",
    link: "/campus-maintenance",
    icon: <ConstructionIcon />,
    image: "/images/cmr.jpg",
    description:
      "This allows students, faculty, and staff to report faulty utilities, broken equipment, or hazardous conditions on campus.",
  },
  {
    name: "Handbook Violation Report",
    link: "/handbook-violation",
    icon: <Book />,
    image: "/images/hvr.jpg",
    description:
      "This allows students, faculty, and staff to report a violation against the University guidelines or student handbook on campus.",
  },
  {
    name: "Emergency",
    link: "/emergency",
    icon: <Siren />,
    image: "/images/erl.jpg",
  },
];

const ReportingOptions = () => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 h-screen  gap-3 md:gap-0">
      {options.map(({ name, link, icon, image, description }, index) => (
        <Link href={link} key={index}>
          <Card className=" h-full relative">
            {image ? (
              <div className="absolute w-full h-full">
                <div className="relative w-full h-full">
                  <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover brightness-50 dark:brightness-[0.2] hover:brightness-75 dark:hover:brightness-50 duration-500 rounded-xl md:rounded-none"
                  />
                </div>
              </div>
            ) : null}
            <CardHeader>
              <CardTitle className="flex items-center p-4">
                <p
                  className={clsx(
                    " z-20 flex items-center gap-2 text-2xl font-semibold",
                    {
                      "text-white": image,
                    }
                  )}
                >
                  {icon}
                  {name}
                </p>
              </CardTitle>
              <CardDescription
                className={clsx("mt-2 z-10", {
                  "text-gray-200": image,
                  "text-gray-600": !image,
                })}
              >
                {description}
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default ReportingOptions;
