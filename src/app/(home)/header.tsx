import { BringToFront } from "lucide-react";
import SideNavToggle from "./side-nav-toggle";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

const Header = async () => {
  const session = await getServerSession(authOptions);
  return (
    <header className="md:hidden flex items-center justify-between mx-2 mt-4 border rounded-full px-4 py-2 shadow-lg">
      <div className="overflow-hidden flex items-center gap-1 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary-foreground">
        <BringToFront size={20} className="text-primary" />
        <Link href={"/"} className="text-xl font-semibold tracking-tighter ">
          Seequentinel
        </Link>
      </div>
      <SideNavToggle session={session} />
    </header>
  );
};

export default Header;
