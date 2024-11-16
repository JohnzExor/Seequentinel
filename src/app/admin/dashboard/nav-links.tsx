"use client";

import { clsx } from "clsx";
import {
  Bell,
  BookMarked,
  Flag,
  LayoutDashboard,
  MapPinned,
  Scroll,
  Settings,
  Shield,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

const NavLinks = ({
  open,

  setOpen,
}: {
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const pathname = usePathname();

  const links = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Reports",
      path: "/admin/dashboard/reports",
      icon: Flag,
    },
    {
      name: "Emergencies",
      path: "/admin/dashboard/emergencies",
      icon: MapPinned,
      isUrgent: true,
    },
    {
      name: "Assigned Reports",
      path: "/admin/dashboard/assigned-reports",
      icon: BookMarked,
    },
    {
      name: "Audit Logs",
      path: "/admin/dashboard/audit-logs",
      icon: Scroll,
    },
    {
      name: "Admins",
      path: "/admin/dashboard/admins",
      icon: Shield,
    },
    {
      name: "Users",
      path: "/admin/dashboard/users",
      icon: User,
    },
    {
      name: "Notifications",
      path: "/admin/dashboard/notifications",
      icon: Bell,
    },
    {
      name: "Settings",
      path: "/admin/dashboard/settings",
      icon: Settings,
    },
  ];

  const handleClick = () => {
    if (open && setOpen) {
      setOpen(!open);
    }
  };

  return (
    <>
      {links.map(({ name, path, icon: Icon }, index) => (
        <li key={index} onClick={handleClick}>
          <Link
            href={path}
            className={clsx(
              "flex items-center gap-3 rounded-lg p-3 text-sm duration-200",
              {
                "bg-primary text-white shadow-lg font-medium":
                  // Match exactly for `/home`
                  (path === "/home" && pathname === "/home") ||
                  // Match startsWith for other paths
                  (path !== "/home" && pathname.startsWith(path)),
                " hover:bg-muted": !pathname.startsWith(path),
              }
            )}
          >
            <Icon className="shrink-0" />
            <span>{name}</span>
          </Link>
        </li>
      ))}
    </>
  );
};

export default NavLinks;
