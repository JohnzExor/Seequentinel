"use client";

import { BringToFront } from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";
import SideNavToggle from "./side-nav-toggle";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const Header = ({ session }: { session: Session | null }) => {
  const pathname = usePathname();
  return (
    <div
      className={clsx("p-4 w-full md:hidden", {
        " absolute z-30": pathname === "/home/emergency",
      })}
    >
      <header
        className={
          "flex items-center justify-between w-full border bg-background shadow-xl px-4 py-2 rounded-full"
        }
      >
        <div className="overflow-hidden flex items-center gap-1 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary-foreground">
          <BringToFront size={20} className="text-primary" />
          <Link
            href={"/home"}
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
