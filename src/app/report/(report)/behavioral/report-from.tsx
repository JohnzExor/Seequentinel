"use client";

import { useServerAction } from "zsa-react";
import behavioralViolationsAction from "./actions";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { behavioralViolationsSchema } from "@/lib/zod";
import { z } from "zod";
import { LoaderCircle, Router } from "lucide-react";
import { Textarea } from "@/components/ui/textArea";

// date picker imports
import { CalendarIcon } from "@radix-ui/react-icons";
import { format, formatISO } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popOver";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const ReportForm = () => {
  const { data } = useSession();
  const router = useRouter();
  const toast = useToast();
  const { execute, isError, error, isPending } = useServerAction(
    behavioralViolationsAction
  );

  const form = useForm<z.infer<typeof behavioralViolationsSchema>>({
    resolver: zodResolver(behavioralViolationsSchema),
    defaultValues: {
      violation: "",
      evidence: "",
      violationDate: "" as unknown as Date,
      location: "",
      violationDetails: "",
      userId: data?.user.id,
      status: "Request",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof behavioralViolationsSchema>
  ) => {
    const res = await execute({
      ...values,
      violationDate: values.violationDate,
      userId: data?.user.id,
    });
    console.log(res);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="px-6">
        <FormField
          control={form.control}
          name="violationDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of Violation</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    captionLayout="dropdown-buttons"
                    fromYear={1990}
                    toYear={2024}
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="violation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Violation</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Violation"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="evidence"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Evidence</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Evidence"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location of Violation</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Location details"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="violationDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Violation Details</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Input details"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full mt-3" disabled={isPending}>
          {isPending ? <LoaderCircle className=" animate-spin" /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default ReportForm;
