"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import NavLinks from "./nav-links";
import React, { useState } from "react";

const SidebarToggle = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent>
        <NavLinks open={isOpen} setOpen={setIsOpen} />
      </SheetContent>
    </Sheet>
  );
};

export default SidebarToggle;
