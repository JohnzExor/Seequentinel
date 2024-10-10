"use client";

import { useServerAction } from "zsa-react";
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
import { z } from "zod";
import { LoaderCircle, Router } from "lucide-react";
import { Textarea } from "@/components/ui/textArea";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import emergencyResponseFeedbackAction from "./actions";
import { reportSchema } from "@/lib/zod";

const ReportForm = () => {
  const { data } = useSession();
  const router = useRouter();
  const toast = useToast();
  const { execute, isError, error, isPending } = useServerAction(
    emergencyResponseFeedbackAction
  );

  const form = useForm<z.infer<typeof reportSchema>>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      reportType: "Emergencies",
      problemType: "",
      details: "",
      userId: data?.user.id,
      attachments: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof reportSchema>) => {
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
          name="problemType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Emergency Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Nature of the Emergency"
                  {...field}
                  className="resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="details"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Help Us Improve</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Specify"
                  {...field}
                  className="resize-none"
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
