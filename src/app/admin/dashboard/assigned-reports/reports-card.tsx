"use client";

import { Badge } from "@/components/ui/badge";
import { Reports } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import { Book, ConstructionIcon } from "lucide-react";
import Link from "next/link";

const titles = {
  CampusMaintenance: "Campus Maintenance Request",
  HandbookViolation: "Handbook Violation Report",
};

const icons = {
  CampusMaintenance: ConstructionIcon,
  HandbookViolation: Book,
};

const ReportsCard = ({ data }: { data: Reports[] }) => {
  return (
    <ul className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
      {data.length > 0 ? (
        data.map(
          ({ id, reportType, problemType, createdAt, status }, index) => {
            const Icon = icons[reportType];
            const title = titles[reportType];
            return (
              <li key={index}>
                <Link
                  href={`/admin/dashboard/document/${id}`}
                  className="flex flex-col p-5 border rounded-xl md:hover:bg-muted"
                >
                  <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
                    <Icon size={15} />
                    <span>{title}</span>
                  </div>
                  <h1 className="text-2xl font-bold">{problemType}</h1>
                  <span className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(createdAt))} Ago
                  </span>
                  <Badge className="w-fit mt-1">{status}</Badge>
                </Link>
              </li>
            );
          }
        )
      ) : (
        <span>No reports</span>
      )}
    </ul>
  );
};

export default ReportsCard;
