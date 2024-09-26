import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import React, { ReactNode } from "react";
import Link from "next/link";

const ReportsCard = ({
  data,
}: {
  data: {
    id: string;
    reportType?: string;
    type?: string;
    violation?: string;
    status: string;
    createdAt: Date;
    path: string;
    icon: ReactNode;
  }[];
}) => {
  return (
    <div>
      {data.length > 0 ? (
        data.map(
          (
            { type, violation, reportType, createdAt, status, path, icon },
            index
          ) => (
            <Link href={path} key={index}>
              <Card className="mb-2 w-full hover:bg-muted duration-500">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="">{type ? type : violation}</CardTitle>
                  <Badge>{status}</Badge>
                </CardHeader>
                <CardContent>
                  <CardDescription className="flex items-center gap-1">
                    {icon}
                    {reportType}
                  </CardDescription>
                  <p className="">
                    Reported on: {createdAt.toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            </Link>
          )
        )
      ) : (
        <div>No Reports Found</div>
      )}
    </div>
  );
};

export default ReportsCard;
