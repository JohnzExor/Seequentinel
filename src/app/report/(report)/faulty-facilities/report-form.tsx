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
import {
  ImageUp,
  ListCheck,
  LoaderCircle,
  MapPinned,
  Router,
} from "lucide-react";
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
import clsx from "clsx";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

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

  const steps = [
    {
      name: "Details",
      description: "Give the details of the problem",
      icon: <ListCheck />,
      step: 0,
    },
    {
      name: "Photo",
      description: "Provide media files for proof",
      icon: <ImageUp />,
      step: 1,
    },
    {
      name: "Location",
      description: "Place where maintenance is needed",
      icon: <MapPinned />,
      step: 2,
    },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  return (
    <>
      <div className="flex flex-col items-center h-full justify-between">
        <div className="flex items-start py-4 justify-center w-full">
          {steps.map(({ name, description, icon }, index) => (
            <div
              key={index}
              className={clsx("flex items-start gap-4", {
                " text-muted-foreground":
                  index > steps.findIndex((obj) => obj.step === currentStep),
              })}
            >
              <div className="flex flex-col">
                <div className="flex items-center">
                  <div
                    className={clsx(
                      " w-fit p-3 rounded-full text-white self-center",
                      {
                        " bg-primary": currentStep === index,
                        " bg-muted": currentStep !== index,
                        " text-current":
                          index <=
                          steps.findIndex((obj) => obj.step === currentStep) -
                            1,
                      }
                    )}
                  >
                    {icon}
                  </div>
                  <Separator
                    className={clsx("w-28", {
                      hidden: index >= steps.length - 1,
                    })}
                  />
                </div>
                <div className="w-28">
                  <p className=" font-semibold text-left flex flex-col">
                    {name}
                    <span className=" text-sm text-muted-foreground font-normal">
                      {description}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col justify-center px-6 h-full w-2/4"
          >
            {currentStep === 0 ? (
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
            ) : null}

            {currentStep === 1 ? (
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
            ) : null}
            {currentStep === 2 ? (
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
            ) : null}

            <div className="flex justify-between mt-4">
              {currentStep > 0 ? (
                <Button type="button" onClick={prevStep}>
                  Previous
                </Button>
              ) : null}
              {currentStep < 2 ? (
                <Button type="button" onClick={nextStep} className="self-end">
                  Next
                </Button>
              ) : null}
              {currentStep === 2 ? (
                <Button type="submit" className="w-2/4" disabled={isPending}>
                  {isPending ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    "Submit"
                  )}
                </Button>
              ) : null}
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default ReportForm;
