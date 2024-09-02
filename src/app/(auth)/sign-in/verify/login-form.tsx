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
import { loginSchema } from "@/lib/zod";
import loginUserAction from "./actions";
import { Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailHref = searchParams.get("email");
  const { execute, isError, error, isPending } =
    useServerAction(loginUserAction);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: emailHref as string,
      password: "",
    },
  });

  const onSubmit = async ({ email, password }: z.infer<typeof loginSchema>) => {
    const res = await execute({ email, password });
    console.log(res);
    if (res && res[0]?.ok !== true) {
      form.setError("password", {
        type: "manual",
        message: res[0]?.error as string,
      });
      return;
    }
    router.push("/dashboard");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-6">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormDescription>
                We encrypt your password so that we can secure your security.
              </FormDescription>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full mt-3" disabled={isPending}>
          {isPending ? <Loader /> : "Login"}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
