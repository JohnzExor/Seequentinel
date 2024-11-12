"use client";

import { BringToFront } from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";
import SideNavToggle from "./side-nav-toggle";

const Header = ({ session }: { session: Session | null }) => {
  return (
    <div className="p-4 w-full md:hidden">
      <header
        className={
          "flex items-center justify-between w-full border bg-white shadow-xl px-4 py-2 rounded-full"
        }
      >
        <div className="overflow-hidden flex items-center gap-1 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary-foreground">
          <BringToFront size={20} className="text-primary" />
          <Link
            href={"/admin/dashboard"}
            className="text-xl font-semibold tracking-tighter "
          >
            Seequentinel
          </Link>
        </div>
        <SideNavToggle session={session} />
      </header>
    </div>
  );
};

export default Header;
