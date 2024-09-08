"use client";

import { useServerAction } from "zsa-react";
import faultyFacilitiesAction from "./actions";
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
import { faultyFacilitiesSchema } from "@/lib/zod";
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
    faultyFacilitiesAction
  );

  const form = useForm<z.infer<typeof faultyFacilitiesSchema>>({
    resolver: zodResolver(faultyFacilitiesSchema),
    defaultValues: {
      type: "",
      media: "",
      location: "",
      userId: data?.user.id,
      status: "Request",
    },
  });

  const onSubmit = async (values: z.infer<typeof faultyFacilitiesSchema>) => {
    const res = await execute({
      ...values,
      userId: data?.user.id,
    });
    console.log(res);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-center px-6 h-full"
      >
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Type"
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
          name="media"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Evidence</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Select media files"
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
              <FormLabel>Location of the Problem</FormLabel>
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
        <Button type="submit" className="w-full mt-3" disabled={isPending}>
          {isPending ? <LoaderCircle className=" animate-spin" /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default ReportForm;
