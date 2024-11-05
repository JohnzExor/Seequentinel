"use client";
import { easeInOut, motion } from "framer-motion";

import clsx from "clsx";
import { Book, ClipboardPlus, Flag, Settings, Shield } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { useSession } from "next-auth/react";

const links = [
  {
    path: "/admin",
    name: "Admin Dashboard",
    icon: Shield,
    role: "ADMIN",
  },
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
  const session = useSession();

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
      {links
        .filter(({ role }) => !role || role === session.data?.user.role)
        .map(({ name, path, icon: Icon }, index) => (
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
              <Icon />
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
