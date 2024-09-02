"use client";

import clsx from "clsx";
import { BringToFront, Flag, LayoutDashboard, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import Logout from "@/components/logout";
import { ModeToggle } from "@/components/theme/mode-toggle";

const navigations = [
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
    path: "/dashboard/settings",
    name: "Settings",
    icon: <Settings />,
  },
];

const SideBar = () => {
  const pathname = usePathname();
  const { data } = useSession();
  return (
    <aside className=" p-8 w-full max-w-[300px] space-y-8">
      <label className="font-semibold flex items-center text-2xl gap-2">
        <BringToFront size={40} />
        Seequentinel
      </label>
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <label className=" font-medium">{data?.user.email}</label>
          <span className=" text-muted-foreground text-sm">
            ID: {data?.user.id}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {navigations.map(({ path, name, icon }) => (
          <Link
            href={path}
            className={clsx("flex items-center gap-2", {
              "bg-primary w-full p-2 font-semibold text-white rounded-2xl":
                pathname == path,
            })}
          >
            {icon}
            {name}
          </Link>
        ))}
      </div>

      <div>
        <Logout />
        <ModeToggle />
      </div>
    </aside>
  );
};

export default SideBar;
