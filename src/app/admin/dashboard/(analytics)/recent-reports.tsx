import { Reports } from "@prisma/client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const RecentReports = ({ reports }: { reports: Reports[] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Reports</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <Table>
          <TableCaption>A list of latest reports</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>Report Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports
              .map(({ id, reportType, status, createdAt }, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{id}</TableCell>
                  <TableCell>{reportType}</TableCell>
                  <TableCell>{status}</TableCell>
                  <TableCell>{createdAt.toLocaleDateString()}</TableCell>
                </TableRow>
              ))
              .reverse()}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentReports;
