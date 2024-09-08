import Logout from "@/components/logout";
import CurrentAdmin from "./current-admin";
import NavLinks from "./nav-links";
import { ModeToggle } from "@/components/theme/mode-toggle";

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-2">
      <aside className="hidden md:block w-80 p-4 space-y-6">
        <div className="flex items-center justify-between">
          <Logout />
          <ModeToggle />
        </div>
        <CurrentAdmin />
        <NavLinks />
      </aside>
      <div className=" w-full p-6">{children}</div>
    </div>
  );
};

export default Sidebar;
