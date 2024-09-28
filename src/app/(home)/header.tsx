import { BringToFront } from "lucide-react";
import SideNavToggle from "./side-nav-toggle";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const Header = async () => {
  const session = await getServerSession(authOptions);
  return (
    <header className="flex items-center justify-between p-4 md:hidden shadow-sm dark:border-b">
      <div className="overflow-hidden flex items-center gap-1 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary-foreground">
        <BringToFront size={20} className="text-primary" />
        <span className="text-xl font-semibold tracking-tighter ">
          Seequentinel
        </span>
      </div>
      <SideNavToggle session={session} />
    </header>
  );
};

export default Header;
