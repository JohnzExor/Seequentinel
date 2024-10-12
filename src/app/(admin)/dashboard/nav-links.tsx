"use client";

import clsx from "clsx";
import {
  Bell,
  ChevronsRight,
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
import { easeInOut, motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";

const links = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <LayoutDashboard />,
    children: [],
  },
  {
    name: "Realtime Reports",
    path: "/dashboard/realtime-reports",
    icon: <ChevronsRight />,
  },
  {
    name: "Campus Maintenance Request",
    path: "/dashboard/campus-maintenance",
    icon: <HousePlug />,
  },
  {
    name: "Handbook Violation Report",
    path: "/dashboard/handbook-violation",
    icon: <UserPen />,
  },
  {
    name: "Emergencies",
    path: "/dashboard/emergencies",
    icon: <Flag />,
  },
  {
    name: "Audit Logs",
    path: "/dashboard/audit-logs",
    icon: <Scroll />,
  },
  {
    name: "Admins",
    path: "/dashboard/admins",
    icon: <Shield />,
  },
  {
    name: "Users",
    path: "/dashboard/users",
    icon: <User />,
  },
  {
    name: "Notifications",
    path: "/dashboard/notifications",
    icon: <Bell />,
  },
  {
    name: "Settings",
    path: "/dashboard/settings",
    icon: <Settings />,
  },
];

const NavLinks = ({
  open,
  isMinimized,

  setOpen,
}: {
  open?: boolean;
  isMinimized?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const pathname = usePathname();

  const handleClick = () => {
    if (open && setOpen) {
      setOpen(!open);
    }
  };

  const isActive = (path: string, children?: { path: string }[]) => {
    if (
      (pathname === "/dashboard" && pathname.startsWith(path)) ||
      (path !== "/dashboard" && pathname.startsWith(path))
    )
      return true;
    if (children) {
      return children.some((child) => pathname === child.path);
    }
    return false;
  };

  return (
    <>
      {links.map(({ name, path, icon, children }, index) => (
        <li key={index}>
          <Link
            href={path}
            onClick={handleClick}
            className={clsx(
              "flex items-center gap-3 text-sm p-2 md:p-3 pr-9 rounded-lg duration-200",
              {
                "bg-primary shadow-lg text-white hover:bg-primary": isActive(
                  path,
                  children
                ),
                "hover:bg-muted": pathname !== path,
              }
            )}
          >
            <div>{icon}</div>
            <motion.div
              initial={{
                width: isMinimized ? 0 : 200,
                opacity: isMinimized ? 0 : 1,
              }}
              animate={{
                width: isMinimized ? 0 : 200,
                opacity: isMinimized ? 0 : 1,
              }}
              transition={{ delay: 0.2, ease: easeInOut }}
              className=" overflow-hidden text-nowrap"
            >
              {name}
            </motion.div>
          </Link>
        </li>
      ))}
    </>
  );
};

export default NavLinks;
