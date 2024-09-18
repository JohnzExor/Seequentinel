"use client";

import supabase from "@/lib/storage";
import { v4 as uuidv4 } from "uuid";

import { useServerAction } from "zsa-react";
import faultyFacilitiesAction from "./actions";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { faultyFacilitiesSchema } from "@/lib/zod";
import { z } from "zod";
import {
  ChevronLeft,
  ChevronRight,
  LoaderCircle,
  UploadCloudIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const options = [
  // Electrical Issues
  {
    id: 1,
    name: "Power Outage",
  },
  {
    id: 2,
    name: "Faulty Lighting",
  },

  // Plumbing Issues
  {
    id: 3,
    name: "Leaking Pipe",
  },
  {
    id: 4,
    name: "Clogged Drain",
  },
  {
    id: 5,
    name: "No Water Supply",
  },

  // Structural Issues
  {
    id: 6,
    name: "Broken Window",
  },
  {
    id: 7,
    name: "Damaged Door",
  },
  {
    id: 8,
    name: "Cracked Wall",
  },

  // HVAC Issues
  {
    id: 9,
    name: "Air Conditioning Failure",
  },
  {
    id: 10,
    name: "Heating System Malfunction",
  },

  // Grounds Maintenance
  {
    id: 11,
    name: "Overgrown Landscaping",
  },
  {
    id: 12,
    name: "Potholes",
  },
  {
    id: 13,
    name: "Debris Cleanup",
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
    faultyFacilitiesAction
  );

  const [isUploading, setIsUploading] = useState<boolean>(false);

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

  const handleFileOnchange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setIsUploading(true);
      const upload = await UploadMedia(file);
      if (upload) form.setValue("media", upload.path);
    }
    setIsUploading(false);
  };

  const onSubmit = async (values: z.infer<typeof faultyFacilitiesSchema>) => {
    const res = await execute({
      ...values,
      userId: data?.user.id,
    });

    if (!res[0]) {
      toast({
        description: "Submission failed",
      });
      return;
    }

    toast({
      title: "Submited Successfully",
      description: "your submission is now on request page",
    });
    router.push("/report-progress");
    form.reset();
  };

  const disableButton = (index: number) => {
    const fields: Array<"type" | "media" | "location" | "status"> = [
      "type",
      "media",
      "location",
      "status",
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
            name="type"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isPending}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a problem" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {options.map((data, index) => (
                      <SelectItem
                        key={index}
                        value={data.name}
                        className=" w-full"
                      >
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
        {currentStep === 2 ? (
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
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

        {currentStep === 3 ? (
          <div>
            <p>
              Type: <span>{form.getValues("type")}</span>
            </p>
            <p>
              Media: <span>{form.getValues("media")}</span>
            </p>
            <p>
              location: <span>{form.getValues("location")}</span>
            </p>
            <p>
              status: <span>{form.getValues("status")}</span>
            </p>
          </div>
        ) : null}

        <div className="flex items-center justify-between">
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
          {currentStep < 3 ? (
            <Button
              disabled={disableButton(currentStep)}
              type="button"
              onClick={nextStep}
              className=" ml-auto"
            >
              <ChevronRight />
            </Button>
          ) : null}
          {currentStep === 3 ? (
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
