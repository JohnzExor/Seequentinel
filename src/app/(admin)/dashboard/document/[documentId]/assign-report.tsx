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
import { LoaderCircle, UserCheck } from "lucide-react"; // Change icon to represent "assign"
import { useServerAction } from "zsa-react";
import { useToast } from "@/hooks/use-toast";
import { SetReportAssignedAction } from "./action";
import { useSession } from "next-auth/react";

const AssignReport = ({ documentId }: { documentId: string }) => {
  const { toast } = useToast();
  const { execute, isPending } = useServerAction(SetReportAssignedAction);
  const session = useSession();
  const userId = session.data?.user.id as string;

  const handleAssignReport = async () => {
    const res = await execute({ documentId, userId });
    if (!res)
      return toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });

    toast({
      title: "Assigned Successfully!",
      description: "This report has been assigned to you.",
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild disabled={isPending}>
        {isPending ? (
          <LoaderCircle className=" animate-spin" />
        ) : (
          <Button variant={"outline"}>
            <UserCheck className="w-4 h-4 md:mr-2" />
            <span className="hidden md:block">Assign Report</span>
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to assign this report to yourself?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action will assign the report to you and mark you as the
            responsible user for its follow-up.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleAssignReport}>
            Assign
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AssignReport;
