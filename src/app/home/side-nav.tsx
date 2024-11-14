import React from "react";
import NavLinks from "./nav-links";
import { BringToFront, Shield } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Session } from "next-auth";
import Logout from "@/components/logout";
import { ModeToggle } from "@/components/theme/mode-toggle";
import Link from "next/link";

const SideNavigations = ({ session }: { session: Session | null }) => {
  const user = session?.user;

  return (
    <aside className=" hidden md:flex flex-col h-screen w-[350px] py-10 px-7 shadow-2xl shrink-0 space-y-4 bg-background rounded-r-xl">
      <header className="flex justify-between items-center">
        <div className="overflow-hidden flex items-center gap-1 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary-foreground">
          <BringToFront size={30} className="text-primary" />
          <span className="text-xl font-semibold text-nowrap">
            Seequentinel
          </span>
        </div>
        <ModeToggle />
      </header>

      <ul className="space-y-4 flex-grow">
        <span className="pl-4 text-sm text-muted-foreground font-semibold">
          Main Menu
        </span>
        <NavLinks />
      </ul>

      {user?.role === "ADMIN" && (
        <Link href="/admin/dashboard" className="bg-muted p-4 rounded-xl">
          <div className="flex gap-1">
            <h1 className="font-medium">You have administrative privileges</h1>
            <Shield className="text-primary" />
          </div>
          <span className="text-sm text-muted-foreground">
            Click here to access the dashboard
          </span>
        </Link>
      )}

      <footer className="space-y-4 mt-auto">
        <div className="flex items-center gap-2 w-full text-nowrap">
          <Avatar>
            <AvatarFallback className="text-primary bg-primary-foreground text-xl font-bold">
              S
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <Badge className="w-fit">{session?.user.role} Account</Badge>
            <label className=" font-medium text-sm">{user?.email}</label>
            <span className="text-xs text-muted-foreground">
              ID: {user?.id}
            </span>
          </div>
        </div>
        <Logout />
      </footer>
    </aside>
  );
};

export default SideNavigations;
