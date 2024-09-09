"use client";

import clsx from "clsx";
import {
  Bell,
  Flag,
  HousePlug,
  LayoutDashboard,
  Scroll,
  Settings,
  Shield,
  User,
  UserPen,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

const links = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    name: "Campus Maintenance Request",
    path: "/admin/dashboard/faulty-facilities",
    icon: <HousePlug />,
  },
  {
    name: "Handbook Violation Report",
    path: "/admin/dashboard/behavior",
    icon: <UserPen />,
  },
  {
    name: "Emergencies",
    path: "/admin/dashboard/emergencies",
    icon: <Flag />,
  },
  {
    name: "Audit Logs",
    path: "/admin/dashboard/audit-logs",
    icon: <Scroll />,
  },
  {
    name: "Admins",
    path: "/admin/dashboard/admins",
    icon: <Shield />,
  },
  {
    name: "Users",
    path: "/admin/dashboard/users",
    icon: <User />,
  },
  {
    name: "Notifications",
    path: "/admin/dashboard/notifications",
    icon: <Bell />,
  },
  {
    name: "Settings",
    path: "/admin/dashboard/settings",
    icon: <Settings />,
  },
];

const NavLinks = ({
  open,
  setOpen,
}: {
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const pathname = usePathname();

  const handleClick = () => {
    if (open && setOpen) {
      setOpen(!open);
    }
  };

  return (
    <div className=" space-y-1">
      <p className=" text-muted-foreground text-sm mb-2">Navigations</p>
      {links.map(({ name, path, icon }, index) => (
        <Link
          href={path}
          key={index}
          onClick={handleClick}
          className={clsx(
            "flex items-center p-2 gap-2 rounded-2xl text-sm", // Common classes
            "hover:bg-black hover:bg-opacity-5 dark:hover:bg-opacity-5", // Common hover classes
            {
              "bg-primary hover:bg-primary text-white": pathname === path, // Active link state
              "dark:hover:bg-white dark:hover:bg-primary": pathname !== path, // Dark mode hover only for non-active links
            }
          )}
        >
          {icon}
          {name}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
