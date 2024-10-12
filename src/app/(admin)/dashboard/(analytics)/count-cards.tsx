import { Reports, StatusEnum } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle, CheckCircle, FileText, Users } from "lucide-react";

const CountCards = ({
  reports,
  userCount,
}: {
  reports: Reports[];
  userCount: number;
}) => {
  const reportCounter = (getStatus: StatusEnum) => {
    return reports.filter(({ status }) => status === getStatus).length;
  };

  const cardData = [
    {
      label: "Total Reports",
      icon: FileText,
      count: reports.length,
      description: "Across all categories",
    },
    {
      label: "Total Users",
      icon: Users,
      count: userCount,
      description: "Active system users",
    },
    {
      label: "Completed Reports",
      icon: CheckCircle,
      count: reportCounter("Completed"),
      description: "Reports marked as completed",
    },
    {
      label: "Pending Reports",
      icon: AlertTriangle,
      count: reportCounter("Request"),
      description: "Reports awaiting action",
    },
  ];
  return (
    <div className=" col-span-2">
      <div className="grid md:grid-cols-4 gap-2">
        {cardData.map(({ label, icon: Icon, count, description }, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{label}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{count}</div>
              <p className="text-xs text-muted-foreground">{description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CountCards;
