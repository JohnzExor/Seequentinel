"use client";

import { Book, ConstructionIcon, PhoneCall, Siren } from "lucide-react";

import Link from "next/link";
import Image from "next/image";
import CampusMaintenanceImage from "/public/images/cmr.jpg";
import HandBookViolationImage from "/public/images/hvr.jpg";
import CurrentLocation from "./current-location";
import { useContext, useState } from "react";
import { EmergencyContext } from "./emergency-data-provider";
import { Emergencies } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useServerAction } from "zsa-react";
import { useRouter } from "next/navigation";
import { postEmergencyAction } from "./(report-options)/emergency/actions";

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

const ReportingOptions = () => {
  const session = useSession();
  const router = useRouter();
  const { peerId, setData, gpsCoordinates, location } =
    useContext(EmergencyContext);

  const emergency = useServerAction(postEmergencyAction);

  const [tapCounter, setTapCounter] = useState<number>(0);

  const handleEmergencyRequest = async () => {
    try {
      const res = await emergency.execute({
        userId: session.data?.user.id as string,
        peerId: peerId,
        gpsCoordinates: gpsCoordinates as [number, number],
        location: location,
      });

      setData(res[0] as Emergencies);
      router.push("/home/emergency");

      setTapCounter(0);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleTapCounter = () => {
    if (tapCounter <= 1) {
      return setTapCounter(tapCounter + 1);
    }
    handleEmergencyRequest();
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 h-screen">
      <div className="px-8 pb-4 pt-4 md:pb-0 md:p-10 lg:hover:bg-muted duration-500 ease-in-out flex flex-col items-center">
        <div className="space-y-4 w-full">
          <div className=" space-y-4">
            <h1 className="md:text-2xl text-lg font-semibold flex items-center gap-2 text-red-500">
              <Siren className=" w-[1.5em] h-[1.5em] md:w-[2em] md:h-[2em] flex-shrink-0" />
              <span>Are you in a emergency?</span>
            </h1>
            <p className="text-muted-foreground text-sm">
              Press the button below and help will reach you soon.
            </p>
          </div>

          <CurrentLocation />
        </div>
        <div className="flex flex-col items-center justify-center h-[20em]">
          <div className="flex flex-col justify-center items-center">
            <div className=" absolute rounded-full bg-red-50 dark:bg-red-300 h-[18em] w-[18em] animate-pulse shadow-xl" />
            <div className=" absolute rounded-full bg-red-100 dark:bg-red-400 h-[15em] w-[15em] animate-pulse shadow-xl" />
            <div className=" absolute rounded-full bg-red-300 dark:bg-red-500 h-[12em] w-[12em] animate-pulse shadow-xl" />
            <button
              onClick={handleTapCounter}
              disabled={emergency.isPending || !peerId || !location}
              className="flex flex-col justify-center items-center rounded-full bg-red-500 dark:bg-red-700 disabled:bg-red-300  text-white h-[10em] w-[10em] z-20 shadow-xl hover:scale-105 duration-500 ease-out"
            >
              <span className="text-5xl font-bold">
                {tapCounter > 0 ? (
                  emergency.isPending ? (
                    <PhoneCall size={80} className="animate-pulse" />
                  ) : (
                    tapCounter
                  )
                ) : (
                  "SOS"
                )}
              </span>
              <span className="text-sm">tap 3 times</span>
            </button>
          </div>
        </div>
        <span className="text-xs text-muted-foreground mt-auto md:pb-4">
          Peer ID: {peerId ? peerId : "Getting Peer ID...."}
        </span>
      </div>
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

export default ReportingOptions;
