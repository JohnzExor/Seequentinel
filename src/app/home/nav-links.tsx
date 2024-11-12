"use client";

import { clsx } from "clsx";
import { Book, ClipboardPlus, Flag, Settings, Shield } from "lucide-react";
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
      path: "/home",
      name: "Report",
      icon: ClipboardPlus,
    },

    {
      path: "/home/report-progress",
      name: "Report progress",
      icon: Flag,
    },
    {
      path: "/home/handbook-overview",
      name: "Student Handbook",
      icon: Book,
    },
    {
      path: "/home/settings",
      name: "Settings",
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
              "flex items-center gap-2 rounded-xl px-4 py-3 text-sm border border-muted",
              {
                "bg-primary text-white shadow-xl font-medium":
                  pathname === path,
                " hover:bg-muted": pathname !== path,
              }
            )}
          >
            <Icon className="shrink-0 w-5 h-5" />
            <span>{name}</span>
          </Link>
        </li>
      ))}
    </>
  );
};

export default NavLinks;
