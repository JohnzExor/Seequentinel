"use client";

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
import { changePasswordSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { useServerAction } from "zsa-react";
import { changePasswordAction } from "./action";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const ChangePasswordForm = () => {
  const { data } = useSession();
  const { toast } = useToast();

  const { execute, isPending } = useServerAction(changePasswordAction);

  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof changePasswordSchema>) => {
    const comparePassword = values.password === values.confirmPassword;
    if (!comparePassword)
      return toast({
        title: "Uh oh! Something went wrong.",
        description: "The password did not match!",
      });

    await execute({ ...values, id: data?.user.id });

    toast({
      title: "Password changed!",
      description: "Your password is updated successfully.",
    });
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full flex flex-col"
      >
        {data?.user ? (
          <div className=" border rounded-xl p-3 mt-4">
            <h1 className=" font-semibold">{data?.user.email}</h1>
            <span className=" text-muted-foreground text-sm">
              ID: {data?.user.id}
            </span>
          </div>
        ) : (
          <Skeleton className=" p-9" />
        )}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your new password"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Make sure your new password is strong and secure.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm your new password"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Re-enter your new password to confirm it.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={isPending}
          type="submit"
          className="w-full lg:w-[15em] lg:ml-auto"
        >
          {isPending ? (
            <LoaderCircle className=" animate-spin" />
          ) : (
            "Change Password"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ChangePasswordForm;
