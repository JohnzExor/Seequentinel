"use client";

import { useServerAction } from "zsa-react";
import behavioralViolationsAction from "./actions";
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
import { behavioralViolationsSchema } from "@/lib/zod";
import { z } from "zod";
import {
  ImageUp,
  ListCheck,
  LoaderCircle,
  LucideCalendar,
  MapPinned,
  RectangleEllipsisIcon,
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
    behavioralViolationsAction
  );

  const form = useForm<z.infer<typeof behavioralViolationsSchema>>({
    resolver: zodResolver(behavioralViolationsSchema),
    defaultValues: {
      violation: "",
      evidence: "",
      violationDate: "" as unknown as Date,
      location: "",
      violationDetails: "",
      userId: data?.user.id,
      status: "Request",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof behavioralViolationsSchema>
  ) => {
    const res = await execute({
      ...values,
      violationDate: values.violationDate,
      userId: data?.user.id,
    });
    console.log(res);
  };
  const steps = [
    {
      name: "Violation",
      description: "Select a violation",
      icon: <RectangleEllipsisIcon />,
      step: 0,
    },
    {
      name: "Violation Date",
      description: "Select the date of the violation",
      icon: <LucideCalendar />,
      step: 1,
    },
    {
      name: "Evidence",
      description: "Provide media files for proof",
      icon: <ImageUp />,
      step: 2,
    },
    {
      name: "Location",
      description: "Place where it happened",
      icon: <MapPinned />,
      step: 3,
    },
    {
      name: "Details",
      description: "Provide additional info",
      icon: <ListCheck />,
      step: 4,
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
                name="violation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Violation</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Violation"
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
                name="violationDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of Violation</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-2/4 pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          captionLayout="dropdown-buttons"
                          fromYear={1990}
                          toYear={2024}
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : null}

            {currentStep === 2 ? (
              <FormField
                control={form.control}
                name="evidence"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Evidence</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Evidence"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : null}

            {currentStep === 3 ? (
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location of Violation</FormLabel>
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

            {currentStep === 4 ? (
              <FormField
                control={form.control}
                name="violationDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Violation Details</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Input details"
                        className="resize-none"
                        {...field}
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
              {currentStep < 4 ? (
                <Button type="button" onClick={nextStep} className="self-end">
                  Next
                </Button>
              ) : null}
              {currentStep === 4 ? (
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
