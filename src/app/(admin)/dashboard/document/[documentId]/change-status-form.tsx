"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  CheckCircle,
  CheckSquare,
  ChevronLeft,
  FilePlus,
  LoaderCircle,
  NotebookPen,
  Search,
} from "lucide-react";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { StatusEnum } from "@prisma/client";
import { changeStatusSchema } from "@/lib/zod";
import { useServerAction } from "zsa-react";
import { setReportStatusAction } from "./action";
import clsx from "clsx";
import { useState } from "react";

const status = [
  {
    status: "Request",
    description:
      "The report has been submitted and is awaiting initial review.",
    icon: FilePlus,
  },
  {
    status: "Reviewing",
    description: "The report is actively being evaluated for further action.",
    icon: Search,
  },
  {
    status: "Accepted",
    description: "The report has been approved and assigned for resolution.",
    icon: CheckCircle,
  },
  {
    status: "Completed",
    description: "The issue has been resolved and the report is closed.",
    icon: CheckSquare,
  },
];

const ChangeStatusForm = ({
  oldStatus,
  documentId,
}: {
  oldStatus: StatusEnum;
  documentId: string;
}) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const { execute, isPending } = useServerAction(setReportStatusAction);

  const form = useForm<z.infer<typeof changeStatusSchema>>({
    resolver: zodResolver(changeStatusSchema),
    defaultValues: {
      documentId: documentId,
      newStatus: oldStatus,
      isAccepted: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof changeStatusSchema>) => {
    if (!values.isAccepted) {
      return toast({
        title: "Terms Not Accepted",
        description:
          "You must accept the terms to proceed with changing the report status.",
      });
    }

    if (values.newStatus === oldStatus) {
      return toast({
        title: "No Change Detected",
        description:
          "The selected status is the same as the current status. Please select a different status.",
      });
    }

    const res = await execute(values);

    if (res[1]) {
      return toast({
        title: "Update Failed",
        description:
          "There was an issue processing your request. Please try again.",
      });
    }

    toast({
      title: "Status Updated",
      description: "The report status has been successfully changed.",
    });
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={cn("flex gap-1", buttonVariants({ variant: "outline" }))}
      >
        <NotebookPen />{" "}
        <span className="hidden lg:block">Change Report Status</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Report Status</DialogTitle>
          <DialogDescription>
            Ensure that you are responsible for this action before proceeding.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="newStatus"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Select New Status</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className=" grid grid-cols-2"
                      disabled={isPending}
                    >
                      {status.map(
                        ({ status, icon: Icon, description }, index) => (
                          <label
                            className={clsx(
                              " p-3 border rounded-xl disabled:bg-black cursor-pointer",
                              {
                                " bg-primary text-white":
                                  status === form.getValues("newStatus"),
                              },
                              {
                                " hover:bg-muted":
                                  status !== form.getValues("newStatus"),
                              }
                            )}
                            key={index}
                          >
                            <RadioGroupItem
                              value={status}
                              className=" sr-only"
                            />
                            <div>
                              <div className="flex items-center justify-between">
                                <h1 className="font-medium">{status}</h1>
                                <Icon />
                              </div>

                              <p className="text-sm">{description}</p>
                            </div>
                          </label>
                        )
                      )}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isAccepted"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isPending}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Accept Responsibility</FormLabel>
                    <FormDescription>
                      By checking this box, you agree to the terms and confirm
                      that you are responsible for changing the status of this
                      report.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant={"secondary"}
                onClick={() => setOpen(false)}
              >
                <ChevronLeft />
              </Button>
              <Button type="submit" className="w-full">
                {isPending ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  "Submit Changes"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeStatusForm;
