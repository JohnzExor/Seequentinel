"use client";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { ChevronUp } from "lucide-react";

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
import EmergencyDetails from "./emergency-details";

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

          <DialogContent className="max-w-[50em] max-h-screen overflow-y-auto bg-muted">
            <DialogHeader>
              <DialogTitle>Emergency Details</DialogTitle>
              <DialogDescription>
                Here are the details of the ongoing call.
              </DialogDescription>
            </DialogHeader>
            <EmergencyDetails />
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger className="w-full flex justify-center">
            <ChevronUp
              size={30}
              className="shrink-0  animate-bounce text-primary"
            />
          </DrawerTrigger>
          <DrawerContent className="max-h-screen overflow-y-auto bg-muted">
            <DrawerHeader>
              <DrawerTitle>Emergency Details</DrawerTitle>
              <DrawerDescription>
                Here are the details of the ongoing call.
              </DrawerDescription>
            </DrawerHeader>
            <EmergencyDetails />
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};

export default EmergencyToggle;
