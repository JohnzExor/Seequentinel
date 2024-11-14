"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

import { Reports } from "@prisma/client";
import Link from "next/link";
import { Book } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export const columns: ColumnDef<Reports>[] = [
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
    header: "Document Id",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "problemType",
    header: "Report Type",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const id: string = row.getValue("id");

      return (
        <Link
          href={`/admin/dashboard/document/${id}`}
          className={cn(buttonVariants(), " space-x-1")}
        >
          <Book size={20} />
          <span>View Report</span>
        </Link>
      );
    },
  },
];
