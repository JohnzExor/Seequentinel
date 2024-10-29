"use client";

import { Reports } from "@prisma/client";
import { useEffect, useState } from "react";
import ReportsTab from "./reports-tab";
import supabase from "@/lib/storage";

const RealtimeReports = ({ data }: { data: Reports[] }) => {
  const [reports, setReports] = useState(data);

  useEffect(() => {
    const channel = supabase
      .channel("reports-db-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Reports" },
        async (payload) => {
          setReports([...reports, payload.new as Reports]);
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [reports, setReports]);

  return (
    <>
      <ReportsTab reports={reports} />
    </>
  );
};

export default RealtimeReports;
