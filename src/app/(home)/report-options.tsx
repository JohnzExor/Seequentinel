"use client";

import { Book, ConstructionIcon, Siren } from "lucide-react";

import Link from "next/link";
import Image from "next/image";

const options = [
  {
    name: "Campus Maintenance Request",
    link: "/campus-maintenance",
    icon: ConstructionIcon,
    image: "/images/cmr.jpg",
    description:
      "This allows students, faculty, and staff to report faulty utilities, broken equipment, or hazardous conditions on campus.",
  },
  {
    name: "Handbook Violation Report",
    link: "/handbook-violation",
    icon: Book,
    image: "/images/hvr.jpg",
    description:
      "This allows students, faculty, and staff to report a violation against the University guidelines or student handbook on campus.",
  },
  {
    name: "Emergency",
    link: "/emergency",
    icon: Siren,
    image: "/images/erl.jpg",
  },
];

const ReportingOptions = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 h-screen">
      {options.map(({ name, link, icon: Icon, image, description }, index) => (
        <Link href={link} key={index} className=" relative">
          <div className=" space-y-4 absolute z-10 p-10 text-white w-full">
            <div className="flex items-center gap-1 font-medium md:text-2xl md:gap-4">
              <Icon className=" w-[1.5em] h-[1.5em] md:w-[2em] md:h-[2em]" />
              <span>{name}</span>
            </div>
            <p className=" text-sm text-muted dark:text-muted-foreground break-words">
              {description}
            </p>
          </div>
          <div className=" relative h-full w-full overflow-hidden">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover md:grayscale hover:grayscale-0 duration-500 brightness-50 hover:brightness-75 dark:brightness-[0.3] dark:hover:brightness-[0.4] md:hover:scale-110"
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ReportingOptions;
