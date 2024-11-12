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
import checkUserEmailAction from "./actions";
import { emailSchema } from "@/lib/zod";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "./auth-context";

const EmailForm = () => {
  const router = useRouter();
  const { execute, isPending, isSuccess } =
    useServerAction(checkUserEmailAction);

  const { setEmail } = useContext(AuthContext);

  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async ({ email }: z.infer<typeof emailSchema>) => {
    try {
      const res = await execute({ email });
      if (res[1]) {
        form.setError("email", {
          type: "manual",
          message: res[1].message,
        });
        return;
      }
      setEmail(email);
      router.push(`/sign-in/verify`);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="px-6">
        <div className="flex flex-col space-y-2 text-center mb-5">
          <h1 className="text-2xl font-semibold tracking-tight">
            Sign in your account
          </h1>
          <p className="text-sm text-muted-foreground">
            Make sure your account is validated and registered.
          </p>
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Corporate Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your corporate email"
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
            "Next"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default EmailForm;
