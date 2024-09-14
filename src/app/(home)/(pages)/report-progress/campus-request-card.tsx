import { FaultyFacilities } from "@prisma/client";
import {
  BookCheck,
  CircleFadingArrowUp,
  ListCheck,
  Loader,
  Square,
  TriangleAlert,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactElement } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { Separator } from "@/components/ui/separator";

const steps = [
  {
    name: "Request",
    description:
      "Provide your name and email address. We will use this information to create your account",
    icon: <Loader />,
  },
  {
    name: "Reviewing",
    description:
      "Provide your name and email address. We will use this information to create your account",
    icon: <Square />,
  },
  {
    name: "Accepted",
    description:
      "Provide your name and email address. We will use this information to create your account",
    icon: <ListCheck />,
  },
  {
    name: "Completed",
    description:
      "Provide your name and email address. We will use this information to create your account",
    icon: <BookCheck />,
  },
];

const CampusRequestCard = async ({
  title,
  data,
  icon,
}: {
  icon: ReactElement;
  title: string;
  data: FaultyFacilities[];
}) => {
  return (
    <div className=" space-y-4 ">
      <div className="flex items-center gap-2">
        {icon}
        <h1 className="font-medium">{title}</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.length > 0 ? (
          data.map(({ id, type, status, createdAt, media }, index) => (
            <Dialog key={index}>
              <DialogTrigger className="text-start space-y-2 border rounded-xl p-4 cursor-pointer hover:shadow-md duration-300">
                <p className="flex justify-between text -sm">
                  <span>{createdAt.toDateString()}</span>
                  <span className="flex items-center gap-1">
                    <CircleFadingArrowUp size={20} />
                    {status}
                  </span>
                </p>
                <h1 className="font-semibold text-xl">{type}</h1>
                <p className=" text-xs text-muted-foreground">
                  Report ID: {id}
                </p>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="flex flex-col gap-4 text-left">
                    <Button
                      variant={"destructive"}
                      className="flex items-center gap-2 w-fit"
                    >
                      <TriangleAlert />
                      Delete this report
                    </Button>
                    {type}
                  </DialogTitle>
                  <DialogDescription className="text-left">
                    <span>Report ID: {id}</span>
                    <br />
                    <span>Created: {createdAt.toDateString()}</span>
                  </DialogDescription>
                  <div>
                    <div className="flex flex-col gap-4 py-4">
                      {steps.map(({ name, description, icon }, index) => (
                        <div
                          key={index}
                          className={clsx("flex items-start gap-4", {
                            " text-muted-foreground":
                              index >
                              steps.findIndex((obj) => obj.name === status),
                          })}
                        >
                          <div className="flex items-center flex-col">
                            <div
                              className={clsx(
                                " w-fit p-3 rounded-full text-white",
                                {
                                  " bg-primary": status === name,
                                  " bg-muted": status !== name,
                                  " text-current":
                                    index <=
                                    steps.findIndex(
                                      (obj) => obj.name === status
                                    ) -
                                      1,
                                }
                              )}
                            >
                              {icon}
                            </div>
                            <Separator
                              className={clsx("rotate-90 w-10 mt-5 mb-1", {
                                hidden: index >= steps.length - 1,
                              })}
                            />
                          </div>

                          <p className=" font-semibold flex flex-col text-left">
                            {name}
                            <span className=" text-sm text-muted-foreground font-normal">
                              {description}
                            </span>
                          </p>
                        </div>
                      ))}
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">
                        Media/Proof
                      </span>
                      <div className=" w-full h-[300px] relative mt-1">
                        <Image
                          src={`https://mefpvvgnqqvpbqcxloyx.supabase.co/storage/v1/object/public/evidences/${media}`}
                          alt={id}
                          fill
                          className=" rounded-xl object-cover"
                        ></Image>
                      </div>
                    </div>
                  </div>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          ))
        ) : (
          <div>No Reports</div>
        )}
      </div>
    </div>
  );
};

export default CampusRequestCard;
