"use client";
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";
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
import { TrendingUp } from "lucide-react";
import { Reports, ReportTypeEnum } from "@prisma/client";
export const description = "A bar chart with an active bar";

const chartConfig = {
  CampusMaintenance: {
    label: "Campus Maintenance",
    color: "hsl(var(--chart-3))",
  },
  HandbookViolation: {
    label: "Handbook Violation",
    color: "hsl(var(--chart-4))",
  },
  Emergencies: {
    label: "Emergencies",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const ReportTypes = ({ reports }: { reports: Reports[] }) => {
  const reportCounter = (getReportType: ReportTypeEnum) => {
    return reports.filter(({ reportType }) => reportType === getReportType)
      .length;
  };

  const chartData = [
    {
      reportType: "CampusMaintenance",
      count: reportCounter("CampusMaintenance"),
      fill: "var(--color-CampusMaintenance)",
    },
    {
      reportType: "HandbookViolation",
      count: reportCounter("HandbookViolation"),
      fill: "var(--color-HandbookViolation)",
    },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reports by Type</CardTitle>
        <CardDescription>
          Overview of different report types submitted
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="reportType"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="count"
              strokeWidth={2}
              radius={8}
              activeIndex={2}
              activeBar={({ ...props }) => {
                return (
                  <Rectangle
                    {...props}
                    fillOpacity={0.8}
                    stroke={props.payload.fill}
                    strokeDasharray={4}
                    strokeDashoffset={4}
                  />
                );
              }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Overall report types distribution <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing the total count of all report types.
        </div>
      </CardFooter>
    </Card>
  );
};

export default ReportTypes;
