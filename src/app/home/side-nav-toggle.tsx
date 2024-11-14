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
import { Menu, Shield } from "lucide-react";
import NavLinks from "./nav-links";
import React, { useState } from "react";
import { ModeToggle } from "@/components/theme/mode-toggle";
import Logout from "@/components/logout";
import { Session } from "next-auth";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

const SideNavToggle = ({ session }: { session: Session | null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const user = session?.user;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <Menu className=" hover:rotate-180 duration-500 text-primary" />
      </SheetTrigger>
      <SheetContent className="flex flex-col justify-between z-50">
        <SheetHeader className="text-left">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <ModeToggle /> Theme
          </div>
          <SheetTitle>Seequentinel</SheetTitle>
          <SheetDescription>Menu</SheetDescription>

          <ul className=" space-y-1">
            <NavLinks open={isOpen} setOpen={setIsOpen} />
          </ul>
        </SheetHeader>
        <SheetFooter className="gap-2">
          <Logout />
          <div className="flex flex-col">
            <Badge className="w-fit">{session?.user.role} Account</Badge>
            <label className=" font-medium text-sm">{user?.email}</label>
            <span className="text-xs text-muted-foreground">
              ID: {user?.id}
            </span>
          </div>
          {user?.role === "ADMIN" && (
            <Link href="/admin/dashboard" className="bg-muted p-3 rounded-xl">
              <div className="flex gap-1">
                <h1 className="font-medium text-sm">
                  You have administrative privileges
                </h1>
                <Shield className="text-primary" />
              </div>
              <span className="text-xs text-muted-foreground">
                Click here to access the dashboard
              </span>
            </Link>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default SideNavToggle;
