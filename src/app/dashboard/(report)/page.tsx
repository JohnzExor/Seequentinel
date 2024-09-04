import { Airplay, Book, ConstructionIcon, Siren } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const reportOptions = [
  {
    name: "Faulty Facilities",
    link: "/dashboard/faulty-facilities",
    icon: <ConstructionIcon />,
    image: "",
  },
  {
    name: "Behavioral",
    link: "/dashboard/behavioral",
    icon: <Book />,
    image: "",
  },
  {
    name: "Emergency",
    link: "/dashboard/emergency",
    icon: <Siren />,
    image: "",
  },
];

const page = () => {
  return (
    <div className="flex flex-col p-2 justify-start w-full">
      {reportOptions.map(({ name, link, icon }, index) => (
        <Link href={link} key={index}>
          <Card className="h-48 m-[10px]">
            <CardContent className="flex items-center p-4">
              {icon}
              {name}
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default page;
