import { FaultyFacilities } from "@prisma/client";
import { CircleFadingArrowUp, TriangleAlert } from "lucide-react";
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

const ReportCard = async ({
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
          data.map(({ id, type, status, createdAt }, index) => (
            <Dialog key={index}>
              <DialogTrigger className="text-start space-y-2 border rounded-xl p-4 cursor-pointer hover:shadow-md duration-300">
                <p className="flex justify-between text-sm">
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
                    <div className="flex items-center gap-3 p-4">
                      <h1 className="text-muted-foreground text-sm">Status:</h1>
                      <p className=" flex items-center gap-1 text-sm font-bold">
                        <CircleFadingArrowUp size={20} />
                        {status}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">
                        Media/Proof
                      </span>
                      <div className=" w-full h-[300px] relative mt-1">
                        <Image
                          src={"/images/drug.webp"}
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

export default ReportCard;
