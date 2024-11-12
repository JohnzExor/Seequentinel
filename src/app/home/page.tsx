import { Book, ConstructionIcon } from "lucide-react";
import CampusMaintenanceImage from "/public/images/cmr.jpg";
import HandBookViolationImage from "/public/images/hvr.jpg";
import Link from "next/link";
import Image from "next/image";
import EmergencyOption from "./emergency-option";

const options = [
  {
    name: "Campus Maintenance Request",
    link: "/home/campus-maintenance",
    icon: ConstructionIcon,
    image: CampusMaintenanceImage,
    description:
      "This allows students, faculty, and staff to report faulty utilities, broken equipment, or hazardous conditions on campus.",
  },
  {
    name: "Handbook Violation Report",
    link: "/home/handbook-violation",
    icon: Book,
    image: HandBookViolationImage,
    description:
      "This allows students, faculty, and staff to report a violation against the University guidelines or student handbook on campus.",
  },
];

const page = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 h-screen">
      <EmergencyOption />
      {options.map(({ name, link, icon: Icon, image, description }, index) => (
        <Link href={link} key={index} className=" relative h-[18em] xl:h-full">
          <div className=" space-y-4 absolute z-10 p-10 text-white w-full">
            <div className="flex items-center gap-1 font-medium md:text-2xl md:gap-4">
              <Icon className=" w-[1.5em] h-[1.5em] md:w-[2em] md:h-[2em] flex-shrink-0" />
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
              placeholder="blur"
              className="object-cover md:grayscale hover:grayscale-0 duration-500 brightness-50 hover:brightness-75 dark:brightness-[0.3] dark:hover:brightness-[0.4] md:hover:scale-110"
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default page;
