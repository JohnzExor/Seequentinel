"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BringToFront } from "lucide-react";
import React from "react";
import { useSession } from "next-auth/react";
import { Separator } from "@/components/ui/separator";

const CurrentAdmin = () => {
  const { data } = useSession();

  return (
    <div className=" space-y-2">
      <label className="flex items-center gap-1">
        <span className="flex items-center gap-2 font-semibold">
          <BringToFront size={20} className="text-primary" />
          Seequentinel
        </span>
        <span>Admin</span>
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
    </div>
  );
};

export default CurrentAdmin;
