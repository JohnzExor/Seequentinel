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
import { emergencyResponseFeedbackSchema } from "@/lib/zod";
import { z } from "zod";
import { LoaderCircle, Router } from "lucide-react";
import { Textarea } from "@/components/ui/textArea";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import emergencyResponseFeedbackAction from "./actions";

const ReportForm = () => {
  const { data } = useSession();
  const router = useRouter();
  const toast = useToast();
  const { execute, isError, error, isPending } = useServerAction(
    emergencyResponseFeedbackAction
  );

  const form = useForm<z.infer<typeof emergencyResponseFeedbackSchema>>({
    resolver: zodResolver(emergencyResponseFeedbackSchema),
    defaultValues: {
      type: "",
      details: "",
      userId: data?.user.id,
      status: "Request",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof emergencyResponseFeedbackSchema>
  ) => {
    const res = await execute({
      ...values,
      userId: data?.user.id,
    });
    console.log(res);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="px-6">
        <FormField
          control={form.control}
          name="type"
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
