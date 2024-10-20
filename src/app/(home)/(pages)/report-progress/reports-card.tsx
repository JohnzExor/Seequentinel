"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import React, { ForwardRefExoticComponent, RefAttributes } from "react";
import Link from "next/link";
import { LucideProps } from "lucide-react";

const ReportsCard = ({
  data,
}: {
  data: {
    reportType: string;
    problemType: string | null;
    status: string | null;
    createdAt: Date;
    path: string;
    icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
  }[];
}) => {
  return (
    <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
      {data.length > 0 ? (
        data.map(
          (
            { problemType, createdAt, status, path, icon: Icon, reportType },
            index
          ) => (
            <Link href={path} key={index}>
              <Card className="hover:bg-muted duration-500">
                <CardHeader>
                  <CardDescription className="flex items-center gap-1">
                    <Icon size={15} />
                    {reportType}
                  </CardDescription>
                  <CardTitle>{problemType}</CardTitle>
                  <span className=" text-sm text-muted-foreground font-normal">
                    Created {createdAt.toLocaleString()}
                  </span>
                  <Badge className=" w-fit">{status}</Badge>
                </CardHeader>
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
