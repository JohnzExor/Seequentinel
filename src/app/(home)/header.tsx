import { BringToFront } from "lucide-react";
import SideNavToggle from "./side-nav-toggle";

const Header = () => {
  return (
    <div className="flex items-center justify-between p-4 md:hidden shadow-sm">
      <label className="flex items-center gap-2">
        <BringToFront size={20} className="text-primary" />
        Seequentinel
      </label>
      <SideNavToggle />
    </div>
  );
};

export default Header;
