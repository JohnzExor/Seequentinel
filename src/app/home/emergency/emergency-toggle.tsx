"use client";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronUp, TriangleAlert } from "lucide-react";

import { useMediaQuery } from "react-responsive";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import EmergencyCall from "./emergency-call";

const EmergencyToggle = () => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  return (
    <div className=" absolute z-30 bottom-0 flex justify-center w-full p-4">
      {isDesktop ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger
            className={cn(
              buttonVariants({ variant: "destructive" }),
              "flex flex-col items-center -space-y-2 h-fit w-full max-w-[30em]"
            )}
          >
            <ChevronUp size={30} className="shrink-0" />
            <div className="flex items-center gap-1">
              <TriangleAlert />
              <span>View current call</span>
            </div>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Emergency Calls</DialogTitle>
              <DialogDescription>
                Review ongoing emergency calls and take appropriate action if
                needed.
              </DialogDescription>
            </DialogHeader>
            <EmergencyCall />
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger
            className={cn(
              buttonVariants({ variant: "destructive" }),
              "flex flex-col items-center -space-y-2 h-fit w-full max-w-[30em]"
            )}
          >
            <ChevronUp size={30} className="shrink-0" />
            <div className="flex items-center gap-1">
              <TriangleAlert />
              <span>View current call</span>
            </div>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Emergency Calls</DrawerTitle>
              <DrawerDescription>
                View and manage current emergency calls. Stay alert and ready to
                respond.
              </DrawerDescription>
            </DrawerHeader>
            <EmergencyCall />
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};

export default EmergencyToggle;
