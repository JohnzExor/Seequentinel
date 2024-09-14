"use client";

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
    path: "/",
    name: "Report",
    icon: <ClipboardPlus />,
    children: [
      {
        path: "/campus-maintenance",
        name: "Campus Maintenance",
        icon: <ConstructionIcon />,
      },
      {
        path: "/handbook-violation",
        name: "Handbook Violation",
        icon: <Book />,
      },
      {
        path: "/emergency",
        name: "Emergency",
        icon: <Siren />,
      },
    ],
  },

  {
    path: "/report-progress",
    name: "Report progress",
    icon: <Flag />,
  },
  {
    path: "/handbook",
    name: "Student Handbook",
    icon: <Book />,
  },
  {
    path: "/settings",
    name: "Settings",
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
      {links.map(({ name, path, icon, children }, index) => (
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
