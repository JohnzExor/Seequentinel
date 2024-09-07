"use client";

import CurrentAdmin from "./current-admin";
import NavLinks from "./nav-links";

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-2">
      <aside className="hidden md:block w-80 p-4 space-y-6">
        <CurrentAdmin />
        <NavLinks />
      </aside>
      <div className=" w-full p-6">{children}</div>
    </div>
  );
};

export default Sidebar;
