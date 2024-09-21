import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import React from "react";
import Link from "next/link";

const ReportsCard = ({
  data,
  reportTypeInput,
}: {
  data: {
    id: string;
    reportType?: string;
    type?: string;
    violation?: string;
    status: string;
    createdAt: Date;
  }[];
  reportTypeInput?: string;
}) => {
  return (
    <div>
      {data.map(
        ({ id, type, violation, reportType, createdAt, status }, index) => (
          <Link href={`report-progress/${id}`} key={index}>
            <Card className="mb-2 w-full hover:bg-primary-foreground duration-500">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="">{type ? type : violation}</CardTitle>
                <Badge>{status}</Badge>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  {reportTypeInput ? reportTypeInput : reportType}
                </CardDescription>
                <p className="">
                  Reported on: {createdAt.toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          </Link>
        )
      )}
    </div>
  );
};

export default ReportsCard;
