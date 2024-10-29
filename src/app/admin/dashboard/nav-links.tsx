"use client";

import clsx from "clsx";
import {
  Bell,
  BookMarked,
  ChevronsRight,
  Flag,
  HousePlug,
  LayoutDashboard,
  MapPinned,
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

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const links = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Realtime Reports",
    path: "/admin/dashboard/realtime-reports",
    icon: ChevronsRight,
  },

  {
    name: "Campus Map",
    path: "/admin/dashboard/campus-map",
    icon: MapPinned,
  },
  {
    name: "Assigned Reports",
    path: "/admin/dashboard/assigned-reports",
    icon: BookMarked,
  },
  {
    name: "Reports Table",
    icon: Flag,
    children: [
      {
        name: "Campus Maintenance",
        path: "/admin/dashboard/campus-maintenance",
        icon: HousePlug,
      },
      {
        name: "Handbook Violation",
        path: "/admin/dashboard/handbook-violation",
        icon: UserPen,
      },
      {
        name: "Emergencies",
        path: "/admin/dashboard/emergencies",
        icon: Flag,
      },
    ],
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
    if (pathname === path) return true;

    return false;
  };

  return (
    <>
      {links.map(({ name, path, icon: Icon, children }, index) => (
        <li key={index}>
          {children?.length ? (
            <Accordion type="single" collapsible>
              <AccordionItem value="item" className=" border-b-0 text-sm">
                <AccordionTrigger className="px-3 font-normal hover:no-underline hover:bg-primary-foreground rounded-lg duration-200">
                  <div className=" flex items-center gap-3">
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
                      className=" overflow-hidden text-nowrap text-left"
                    >
                      {name}
                    </motion.div>
                  </div>
                </AccordionTrigger>
                <div></div>
                <AccordionContent className="space-y-2">
                  {children.map(({ name, path, icon: Icon }, index) => (
                    <motion.div
                      initial={{
                        margin: "0 1em 0 1em",
                      }}
                      animate={{
                        margin: isMinimized ? "0 0.5em 0 0.5em" : "0 1em 0 1em",
                      }}
                      key={index}
                    >
                      <Link
                        href={path}
                        onClick={handleClick}
                        className={clsx(
                          "flex items-center gap-3 text-sm p-2 md:p-2 pr-9 rounded-lg duration-200 ",
                          {
                            "bg-primary shadow-lg text-white hover:bg-primary":
                              isActive(path, children),
                            "hover:bg-muted": pathname !== path,
                          }
                        )}
                      >
                        <Icon className=" shrink-0 w-5 h-5" />
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
                    </motion.div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : path ? (
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
              <Icon className=" shrink-0" />
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
          ) : null}
        </li>
      ))}
    </>
  );
};

export default NavLinks;
