import Logout from "@/components/logout";
import NavLinks from "./nav-links";
import { ModeToggle } from "@/components/theme/mode-toggle";
import CurrentUser from "./current-user";

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      <aside className="hidden md:block w-80 p-4 space-y-6  h-screen">
        <div className="flex items-center justify-between">
          <Logout />
          <ModeToggle />
        </div>
        <CurrentUser />
        <NavLinks />
      </aside>
      <div className="overflow-y-auto w-full">{children}</div>
    </div>
  );
};

export default Sidebar;
