"use client";

import { useServerAction } from "zsa-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import checkUserEmailAction from "./actions";
import { emailSchema } from "@/lib/zod";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

const EmailForm = () => {
  const router = useRouter();
  const { execute, isError, error, isPending } =
    useServerAction(checkUserEmailAction);

  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async ({ email }: z.infer<typeof emailSchema>) => {
    const res = await execute({ email });
    if (res && res[0].ok !== true) {
      form.setError("email", {
        type: "manual",
        message: res[0].message,
      });
      return;
    }
    router.push(`/sign-in/verify/?email=${encodeURIComponent(email)}`);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Corporate Email</FormLabel>
              <FormDescription>
                Make sure that the corporate email is validated and existing.
              </FormDescription>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your corporate email"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <p className=" text-sm pt-2">Forgot Email?</p>
        <Button type="submit" className="w-full mt-3" disabled={isPending}>
          {isPending ? <Loader /> : "Next"}
        </Button>
      </form>
    </Form>
  );
};

export default EmailForm;
