import { BringToFront } from "lucide-react";
import SidebarToggle from "./sidebar-toggle";

const Header = () => {
  return (
    <div className="flex items-center justify-between p-4 md:hidden">
      <label className="flex items-center gap-2">
        <BringToFront size={20} className="text-primary" />
        Seequentinel
      </label>
      <SidebarToggle />
    </div>
  );
};

export default Header;
