"use client";

import supabase from "@/lib/storage";
import { v4 as uuidv4 } from "uuid";

import { useServerAction } from "zsa-react";
import behavioralViolationsAction from "./actions";
import { useSession } from "next-auth/react";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { behavioralViolationsSchema } from "@/lib/zod";
import { z } from "zod";
import {
  ChevronLeft,
  ChevronRight,
  LoaderCircle,
  UploadCloudIcon,
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
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const behaviors = [
  // Substance Use and Abuse Violations
  {
    id: 1,
    name: "Intoxication",
  },
  {
    id: 2,
    name: "Drug Possession",
  },

  // Behavioral Conduct Violations
  {
    id: 3,
    name: "Discourtesy",
  },
  {
    id: 4,
    name: "Disorderly Conduct",
  },
  {
    id: 5,
    name: "Indecent Conduct",
  },
  {
    id: 6,
    name: "Unlawful Activities",
  },
  {
    id: 7,
    name: "Threatening Behavior",
  },
  {
    id: 8,
    name: "Defamation",
  },
  {
    id: 9,
    name: "Hazing",
  },

  // Campus Rules and Regulations Violations
  {
    id: 10,
    name: "Smoking",
  },
  {
    id: 11,
    name: "Vandalism",
  },
  {
    id: 12,
    name: "Property Destruction",
  },

  // Legal Violation
  {
    id: 13,
    name: "Criminal Offense",
  },
];

export const UploadMedia = async (file: File) => {
  const { data, error } = await supabase.storage
    .from("evidences")
    .upload(`/${uuidv4()}.jpg`, file, {
      cacheControl: "3600",
      upsert: true,
    });
  return data;
};

const ReportForm = ({
  currentStep,
  prevStep,
  nextStep,
}: {
  currentStep: number;
  prevStep: () => void;
  nextStep: () => void;
}) => {
  const { data } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const { execute, isError, error, isPending } = useServerAction(
    behavioralViolationsAction
  );

  const [isUploading, setIsUploading] = useState<boolean>(false);

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

  const handleFileOnchange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    console.log(file);
    if (file) {
      setIsUploading(true);
      const upload = await UploadMedia(file);
      if (upload) form.setValue("evidence", upload.path);
    }
    setIsUploading(false);
  };

  const onSubmit = async (
    values: z.infer<typeof behavioralViolationsSchema>
  ) => {
    const validatedInput = behavioralViolationsSchema.parse({
      ...values,
      userId: data?.user.id,
    });
    const res = await execute(validatedInput);

    if (!res[0]) {
      toast({
        description: "Submission failed",
      });
    }

    toast({
      title: "Submited Successfully",
      description: "your submission is now on request page",
    });
    router.push(`/report-progress/hvr/${res[0]?.id}`);
    form.reset();
  };
  const disableButton = (index: number) => {
    const fields: Array<
      | "violation"
      | "violationDate"
      | "evidence"
      | "location"
      | "violationDetails"
    > = [
      "violation",
      "violationDate",
      "evidence",
      "location",
      "violationDetails",
    ];

    const check = form.getValues(fields[index]);
    return check ? false : true;
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" space-y-4 w-full max-w-[400px]"
      >
        {currentStep === 0 ? (
          <FormField
            control={form.control}
            name="violation"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isPending}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Violation" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {behaviors.map((data, index) => (
                      <SelectItem key={index} value={data.name}>
                        {data.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
          <div className="grid w-full items-center gap-1.5">
            <Input
              onChange={handleFileOnchange}
              id="file"
              disabled={isUploading || isPending}
              type="file"
            />
            {isUploading ? (
              <span className="text-xs flex items-center gap-1 ml-auto text-muted-foreground animate-pulse">
                <UploadCloudIcon />
                Uploading
              </span>
            ) : null}
          </div>
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

        {currentStep === 5 ? (
          <div>
            <p>
              Type: <span>{form.getValues("violation")}</span>
            </p>
            <p>
              Violation Date:{" "}
              <span>{form.getValues("violationDate").toString()}</span>
            </p>
            <p>
              Media: <span>{form.getValues("evidence")}</span>
            </p>
            <p>
              location: <span>{form.getValues("location")}</span>
            </p>
            <p>
              Status: <span>{form.getValues("status")}</span>
            </p>
            <p>
              Violation Details:{" "}
              <span>{form.getValues("violationDetails")}</span>
            </p>
          </div>
        ) : null}

        <div className="flex justify-between mt-4">
          {currentStep > 0 ? (
            <Button
              disabled={isPending}
              type="button"
              variant={"secondary"}
              onClick={prevStep}
            >
              <ChevronLeft />
            </Button>
          ) : null}
          {currentStep < 5 ? (
            <Button
              disabled={disableButton(currentStep)}
              type="button"
              onClick={nextStep}
              className=" ml-auto"
            >
              <ChevronRight />
            </Button>
          ) : null}
          {currentStep === 5 ? (
            <Button type="submit" className="w-2/4" disabled={isPending}>
              {isPending ? <LoaderCircle className="animate-spin" /> : "Submit"}
            </Button>
          ) : null}
        </div>
      </form>
    </Form>
  );
};

export default ReportForm;
