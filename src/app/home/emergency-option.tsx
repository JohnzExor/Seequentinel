"use client";

import { MapPin, Mic, Phone, PhoneCall, Siren, Zap } from "lucide-react";
import { useSession } from "next-auth/react";
import { useServerAction } from "zsa-react";
import { postEmergencyAction } from "./action";
import { useContext, useState } from "react";
import { Emergencies } from "@prisma/client";
import CurrentLocation from "./current-location";
import { UserDataContext } from "./data-provider";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const features = [
  {
    name: "Call",
    icon: Phone,
    description: "Initiate a voice call for emergencies.",
  },
  {
    name: "Location",
    icon: MapPin,
    description: "Track real-time location during emergencies.",
  },
  {
    name: "Response",
    icon: Zap,
    description: "Ensure fast response to emergency calls.",
  },
  {
    name: "Record",
    icon: Mic,
    description: "Record audio for emergency calls.",
  },
];

const EmergencyOption = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { execute, isPending, isSuccess } =
    useServerAction(postEmergencyAction);
  const { userPeerId, setActiveEmergency, gpsCoordinates, isOutsideCampus } =
    useContext(UserDataContext);

  const session = useSession();

  const [tapCounter, setTapCounter] = useState<number>(0);

  const handleEmergencyRequest = async () => {
    if (isOutsideCampus) {
      toast({
        title: "You are outside the university",
        description:
          "This option will totally disable itself when she *finally* decides to come back",
      });
    }
    if (!userPeerId || !setActiveEmergency)
      return console.error("You dont have peer id");
    try {
      const res = await execute({
        userId: session.data?.user.id as string,
        peerId: userPeerId,
        gpsCoordinates: gpsCoordinates as [number, number],
      });
      if (res[0]) {
        setActiveEmergency(res[0] as Emergencies);
      }
      setTapCounter(0);
      router.push("/home/emergency");
    } catch (error) {
      console.error(error);
    }
  };

  const handleTapCounter = () => {
    if (tapCounter <= 1) {
      return setTapCounter(tapCounter + 1);
    }
    handleEmergencyRequest();
  };

  return (
    <div className="px-8 pb-4 pt-4 md:pb-0 md:p-10 lg:hover:bg-muted duration-500 ease-in-out flex flex-col items-center md:gap-7">
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
        <div className="flex flex-col justify-center items-center relative">
          <div className=" absolute rounded-full bg-red-50 dark:bg-red-300 h-[18em] w-[18em] animate-pulse shadow-xl" />
          <div className=" absolute rounded-full bg-red-100 dark:bg-red-400 h-[15em] w-[15em] animate-pulse shadow-xl" />
          <div className=" absolute rounded-full bg-red-300 dark:bg-red-500 h-[12em] w-[12em] animate-pulse shadow-xl" />
          <button
            onClick={handleTapCounter}
            disabled={isPending || !userPeerId || !gpsCoordinates || isSuccess}
            className="flex flex-col justify-center items-center rounded-full bg-red-500 dark:bg-red-700 disabled:bg-red-300  text-white h-[10em] w-[10em] z-20 shadow-xl hover:scale-105 duration-500 ease-out"
          >
            <span className="text-5xl font-bold">
              {tapCounter > 0 ? (
                isPending ? (
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
      <span className="text-xs text-muted-foreground">
        Peer ID: {userPeerId ? userPeerId : "Getting Peer ID...."}
      </span>
      <ul className="grid grid-cols-2 gap-4 mt-6">
        {features.map(({ icon: Icon, name, description }, index) => (
          <li key={index} className="text-sm p-4">
            <div className="flex gap-1">
              <Icon className="w-5 h-5 shrink-0 text-primary" />
              <span className="font-medium">{name}</span>
            </div>
            <span className="text-xs">{description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmergencyOption;
