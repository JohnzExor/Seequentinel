"use client";
import { easeInOut, motion } from "framer-motion";

import clsx from "clsx";
import {
  Book,
  ClipboardPlus,
  ConstructionIcon,
  Flag,
  Settings,
  Siren,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

const links = [
  {
    path: "/home",
    name: "Report",
    icon: <ClipboardPlus />,
  },

  {
    path: "/home/report-progress",
    name: "Report progress",
    icon: <Flag />,
  },
  {
    path: "/home/handbook-overview",
    name: "Student Handbook",
    icon: <Book />,
  },
  {
    path: "/home/settings",
    name: "Settings",
    icon: <Settings />,
  },
];

const NavLinks = ({
  isMinimized,
  open,
  setOpen,
}: {
  isMinimized?: boolean;
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const pathname = usePathname();

  const handleClick = () => {
    if (open && setOpen) {
      setOpen(!open);
    }
  };

  const isActive = (path: string) => {
    return pathname === path || (pathname.startsWith(path) && path !== "/home");
  };

  return (
    <>
      {links.map(({ name, path, icon }, index) => (
        <li key={index}>
          <Link
            href={path}
            onClick={handleClick}
            className={clsx(
              "flex items-center gap-3 text-sm p-3 pr-9 rounded-lg duration-200",
              {
                "bg-primary shadow-lg text-white hover:bg-primary":
                  isActive(path),
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
