"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Reports, StatusEnum } from "@prisma/client";

export const description = "A pie chart with a label";

const chartConfig = {
  Request: {
    label: "Request",
    color: "hsl(var(--chart-1))",
  },
  Reviewing: {
    label: "Reviewing",
    color: "hsl(var(--chart-2))",
  },
  Accepted: {
    label: "Accepted",
    color: "hsl(var(--chart-3))",
  },
  Completed: {
    label: "Completed",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

const ReportStatusDistribution = ({ reports }: { reports: Reports[] }) => {
  const reportCounter = (getStatus: StatusEnum) => {
    return reports.filter(({ status }) => status === getStatus).length;
  };

  const chartData = [
    {
      status: "Request",
      count: reportCounter("Request"),
      fill: "var(--color-Request)",
    },
    {
      status: "Reviewing",
      count: reportCounter("Reviewing"),
      fill: "var(--color-Reviewing)",
    },
    {
      status: "Accepted",
      count: reportCounter("Accepted"),
      fill: "var(--color-Accepted)",
    },
    {
      status: "Completed",
      count: reportCounter("Completed"),
      fill: "var(--color-Completed)",
    },
  ];
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Report Status Distribution</CardTitle>
        <CardDescription>
          Overview of reports categorized by their current status
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="count" label nameKey="status" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Overall report status distribution <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing the total number of reports across all statuses.
        </div>
      </CardFooter>
    </Card>
  );
};

export default ReportStatusDistribution;
