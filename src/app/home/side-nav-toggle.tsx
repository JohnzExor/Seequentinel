"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Menu } from "lucide-react";
import NavLinks from "./nav-links";
import React, { useState } from "react";
import { Session } from "next-auth";
import Logout from "@/components/logout";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { Badge } from "@/components/ui/badge";

const SideNavToggle = ({ session }: { session: Session | null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const user = session?.user;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <Menu className=" hover:rotate-180 duration-500 text-primary" />
      </SheetTrigger>
      <SheetContent className="flex flex-col justify-between">
        <SheetHeader className="text-left">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <ModeToggle /> Theme
          </div>
          <SheetTitle>Seequentinel</SheetTitle>
          <SheetDescription>Menu</SheetDescription>

          <ul className="space-y-2">
            <NavLinks open={isOpen} setOpen={setIsOpen} />
          </ul>
        </SheetHeader>
        <SheetFooter className="gap-2">
          <Logout text="Sign out" />
          <div className="flex flex-col">
            <Badge className="w-fit">{session?.user.role} Account</Badge>
            <label className=" font-medium text-sm">{user?.email}</label>
            <span className=" text-muted-foreground text-xs">
              ID: {user?.id}
            </span>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default SideNavToggle;
