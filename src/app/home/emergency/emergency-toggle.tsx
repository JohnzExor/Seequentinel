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

const EmergencyToggle = () => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  return (
    <div className="w-full">
      {isDesktop ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className="w-full flex justify-center">
            <ChevronUp className="shrink-0 animate-bounce text-primary" />
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Emergency Calls</DialogTitle>
              <DialogDescription>
                Review ongoing emergency calls and take appropriate action if
                needed.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger className="w-[20em] flex justify-center">
            <ChevronUp
              size={30}
              className="shrink-0  animate-bounce text-primary"
            />
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Emergency Calls</DrawerTitle>
              <DrawerDescription>
                View and manage current emergency calls. Stay alert and ready to
                respond.
              </DrawerDescription>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};

export default EmergencyToggle;
