"use client";

import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

import { Button } from "@/components/ui/button";
import { User, UserStatusEnum } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import AccountStatusToggle from "./account-status-toggle";
import { formatDistanceToNow } from "date-fns";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: UserStatusEnum = row.getValue("status");

      return (
        <Badge variant={status === "ACTIVE" ? "default" : "destructive"}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className=" shadow-none"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Account created",
    cell: ({ row }) => {
      const createdAt: Date = row.getValue("createdAt");
      return formatDistanceToNow(new Date(createdAt)) + " ago";
    },
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const id: string = row.getValue("id");
      const status: UserStatusEnum = row.getValue("status");

      return (
        <div className="flex items-center gap-1">
          <AccountStatusToggle userId={id} status={status} />
        </div>
      );
    },
  },
];
