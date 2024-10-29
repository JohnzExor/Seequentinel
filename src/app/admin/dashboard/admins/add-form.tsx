"use client";

import { createUserSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft, LoaderCircle } from "lucide-react";
import { useServerAction } from "zsa-react";
import createUserAction from "./actions";
import { Dispatch } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const AddForm = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { toast } = useToast();

  const router = useRouter();
  const { execute, isError, error, isPending } =
    useServerAction(createUserAction);

  const closeDialogue = () => {
    if (open && setOpen) {
      form.reset();
      setOpen(!open);
    }
  };

  const form = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      email: "",
      type: "admin",
      status: "active",
      password: "123456",
    },
  });

  const onSubmit = async (values: z.infer<typeof createUserSchema>) => {
    const validatedInput = await createUserSchema.parse(values);
    const res = await execute(validatedInput);

    if (res[1]) {
      form.setError("email", {
        type: "manual",
        message: res[1].message,
      });
      return;
    }

    toast({
      title: "Success",
      description: "The corporate account is added successfully",
    });
    closeDialogue();
    router.refresh();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Corporate Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Email"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className=" flex items-center gap-1 mt-3">
          <Button
            type="button"
            onClick={closeDialogue}
            variant={"secondary"}
            disabled={isPending}
          >
            <ChevronLeft />
          </Button>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? <LoaderCircle className=" animate-spin" /> : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddForm;
