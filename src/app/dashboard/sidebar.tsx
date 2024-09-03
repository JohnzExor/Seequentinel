"use client";

import clsx from "clsx";
import {
  Book,
  BringToFront,
  CircleUser,
  Flag,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import Logout from "@/components/logout";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { Separator } from "@/components/ui/separator";

const navigations = [
  {
    path: "/dashboard/account",
    name: "Account",
    icon: <CircleUser />,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <LayoutDashboard />,
  },

  {
    path: "/dashboard/report-progress",
    name: "Report progress",
    icon: <Flag />,
  },
  {
    path: "/dashboard/handbook",
    name: "Student Handbook",
    icon: <Book />,
  },
  {
    path: "/dashboard/settings",
    name: "Settings",
    icon: <Settings />,
  },
];

const SideBar = () => {
  const pathname = usePathname();
  const { data } = useSession();
  return (
    <aside className=" w-80 p-3 py-10 border-r flex flex-col gap-8 h-full">
      <label className="flex items-center text-xl gap-2">
        <BringToFront size={30} className="text-primary" />
        Seequentinel
      </label>
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarFallback>
            {data?.user.email?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <label className=" font-medium text-sm">{data?.user.email}</label>
          <span className=" text-muted-foreground text-xs">
            ID: {data?.user.id}
          </span>
        </div>
      </div>
      <Separator />
      <div className="flex flex-col gap-2 text-sm">
        <span className=" text-sm text-muted-foreground">Navigations</span>
        {navigations.map(({ path, name, icon }) => (
          <Link
            href={path}
            className={clsx("flex gap-2 p-2 items-center rounded-2xl", {
              "bg-primary w-full text-white ": pathname === path,
              "hover:bg-black hover:bg-opacity-5 duration-100":
                pathname !== path,
            })}
          >
            {icon}
            {name}
          </Link>
        ))}
      </div>

      <div className=" mt-auto flex items-center justify-between">
        <Logout />
        <ModeToggle />
      </div>
    </aside>
  );
};

export default SideBar;
