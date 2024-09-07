import {
  Airplay,
  Book,
  ConstructionIcon,
  Fullscreen,
  Siren,
} from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import clsx from "clsx";

const reportOptions = [
  {
    name: "Faulty Facilities",
    link: "/report/faulty-facilities",
    icon: <ConstructionIcon />,
    image: "/images/psu-front.webp",
  },
  {
    name: "Behavioral",
    link: "/report/behavioral",
    icon: <Book />,
    image: "/images/students.jpg",
  },
  {
    name: "Emergency",
    link: "/report/emergency",
    icon: <Siren />,
  },
];

const page = () => {
  return (
    <div className="flex flex-col p-2 justify-start w-full">
      {reportOptions.map(({ name, link, icon, image }, index) => (
        <Link href={link} key={index}>
          <Card className="h-48 m-[10px] relative">
            {image ? (
              <div className="absolute w-full h-full">
                <div className="relative w-full h-full">
                  <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
            ) : null}
            <CardContent className="flex items-center p-4 z-10">
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
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default page;
