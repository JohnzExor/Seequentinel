import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type TReportProgressCard = {
  id: string;
  reportType: string;
  problemType: string | null;
  status: string | null;
  createdAt: Date;
  path: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};
