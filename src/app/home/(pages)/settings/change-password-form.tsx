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
import { useForm } from "react-hook-form";

import { z } from "zod";
import { useServerAction } from "zsa-react";
import { changePasswordAction } from "./action";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";

const ChangePasswordForm = ({ userId }: { userId: string | undefined }) => {
  const { toast } = useToast();

  const { execute, isPending } = useServerAction(changePasswordAction);

  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      id: userId,
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof changePasswordSchema>) => {
    const comparePassword = values.newPassword === values.confirmNewPassword;
    if (!comparePassword)
      return toast({
        title: "Error!",
        description: "The new passwords do not match.",
      });

    const res = await execute(values);
    if (res[1]) {
      return toast({
        title: res[1].name,
        description: res[1].message,
      });
    }

    toast({
      title: "Password Updated",
      description: "Your password has been changed successfully.",
    });
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 w-full flex flex-col px-2"
      >
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your current password"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Make sure your current password is right.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
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
          name="confirmNewPassword"
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
