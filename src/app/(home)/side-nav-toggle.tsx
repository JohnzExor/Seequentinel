"use client";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import NavLinks from "./nav-links";
import React, { useState } from "react";

const SideNavToggle = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent className="space-y-4">
        <SheetTitle>Seequentinel</SheetTitle>
        <NavLinks open={isOpen} setOpen={setIsOpen} />
      </SheetContent>
    </Sheet>
  );
};

export default SideNavToggle;
