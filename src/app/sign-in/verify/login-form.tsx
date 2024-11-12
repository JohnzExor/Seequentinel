"use client";

import { useServerAction } from "zsa-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/lib/zod";
import loginUserAction from "./actions";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { AuthContext } from "../auth-context";

const LoginForm = () => {
  const router = useRouter();
  const { execute, isPending, isSuccess } = useServerAction(loginUserAction);
  const { email } = useContext(AuthContext);

  useEffect(() => {
    if (!email) {
      router.push("/sign-in");
    }
  }, []);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: email,
      password: "",
    },
  });

  const onSubmit = async ({ email, password }: z.infer<typeof loginSchema>) => {
    try {
      const res = await execute({ email, password });
      if (res[1]) {
        form.setError("password", {
          type: "manual",
          message: res[1].message,
        });
        return;
      }
      router.push("/home");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="px-6">
        <div className="flex flex-col space-y-2 text-center mb-5">
          <h1 className="text-2xl font-semibold tracking-tight">
            Enter your password
          </h1>
          <p className="text-sm text-muted-foreground">
            We make sure that your password is secured and encrypted
          </p>
        </div>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                  disabled={isPending || isSuccess}
                  autoFocus
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full mt-3"
          disabled={isPending || isSuccess}
        >
          {isPending || isSuccess ? (
            <LoaderCircle className=" animate-spin" />
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
