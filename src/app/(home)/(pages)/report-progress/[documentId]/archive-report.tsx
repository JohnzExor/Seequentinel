"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Archive } from "lucide-react";
import { useServerAction } from "zsa-react";
import { ArchiveReportAction } from "./action";

const ArchiveReport = ({ id }: { id: string }) => {
  const { execute } = useServerAction(ArchiveReportAction);
  const handleArchiveReport = async () => {
    try {
      await execute({ id });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"outline"}>
          <Archive className="w-4 h-4 md:mr-2" />
          <span className="hidden md:block">Archive Report</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to archive this report?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action will move the report to the archive. You can restore it
            later if needed, but it will no longer be actively accessible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleArchiveReport}>
            Archive
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ArchiveReport;
