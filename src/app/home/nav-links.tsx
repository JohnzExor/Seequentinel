"use client";

import { clsx } from "clsx";
import {
  Book,
  ClipboardPlus,
  ConstructionIcon,
  FileText,
  NotebookPen,
  Settings,
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

  const navigations = [
    {
      groupName: "Report",
      links: [
        {
          path: "/home",
          name: "Emergency and Report",
          icon: ClipboardPlus,
        },
        {
          path: "/home/campus-maintenance",
          name: "Campus Maintenance",
          icon: ConstructionIcon,
        },
        {
          path: "/home/handbook-violation",
          name: "Handbook Violation",
          icon: NotebookPen,
        },
      ],
    },
    {
      groupName: "Other",
      links: [
        {
          path: "/home/report-progress",
          name: "Report progress",
          icon: FileText,
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
      ],
    },
  ];

  const handleClick = () => {
    if (open && setOpen) {
      setOpen(!open);
    }
  };

  return (
    <>
      {navigations.map(({ groupName, links }, index) => (
        <li key={index} onClick={handleClick} className="space-y-2">
          <h1
            className={clsx(
              "pl-2 md:pl-4 text-sm text-muted-foreground font-semibold",
              { "pt-8": index > 0 }
            )}
          >
            {groupName}
          </h1>
          {links.map(({ path, icon: Icon, name }, index) => (
            <Link
              key={index}
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
          ))}
        </li>
      ))}
    </>
  );
};

export default NavLinks;
