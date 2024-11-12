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
import { useToast } from "@/hooks/use-toast";

const ArchiveReport = ({ id }: { id: string }) => {
  const { toast } = useToast();
  const { execute, isPending } = useServerAction(ArchiveReportAction);
  const handleArchiveReport = async () => {
    const res = await execute({ id });
    if (!res)
      return toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });

    toast({
      title: "Archived Successfully!",
      description: "Contact the admin if you need to restore the report.",
    });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild disabled={isPending}>
        <Button variant={"outline"}>
          <Archive className="w-4 h-4 md:mr-2" />
          <span className="hidden lg:block">Archive Report</span>
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
