"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

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

export const description = "A line chart showing report trends";

const chartConfig = {
  reports: {
    label: "Reports",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const ReportsOverview = ({
  data,
}: {
  data: {
    [key: string]: number;
  };
}) => {
  const formatChartData = (data: { [key: string]: number }) => {
    const chartData = Object.entries(data).map(([month, count]) => ({
      month,
      reports: count,
    }));

    return chartData;
  };

  const chartData = formatChartData(data);

  // Calculate trend (just a placeholder, you can implement your own logic)
  const latestMonthReports = chartData[chartData.length - 1]?.reports || 0;
  const previousMonthReports = chartData[chartData.length - 2]?.reports || 0;
  const trend =
    previousMonthReports > 0
      ? ((latestMonthReports - previousMonthReports) / previousMonthReports) *
        100
      : 0;
  const trendText =
    trend > 0
      ? `Trending up by ${trend.toFixed(1)}% this month`
      : `Trending down by ${Math.abs(trend).toFixed(1)}% this month`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reports Overview</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="w-full">
          <span className="text-sm text-muted-foreground pl-4">
            {chartData[0]?.month} - {chartData[chartData.length - 1]?.month}
          </span>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey="reports"
                type="natural"
                stroke="var(--color-reports)"
                strokeWidth={2}
                dot={{
                  fill: "var(--color-reports)",
                }}
                activeDot={{
                  r: 6,
                }}
              />
            </LineChart>
          </ChartContainer>
          <div className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              {trendText} <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing total reports from {chartData[0]?.month} to{" "}
              {chartData[chartData.length - 1]?.month}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportsOverview;
