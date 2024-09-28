"use client";

import supabase, { fileUrl } from "@/lib/storage";
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
import { campusMaintenanceSchema } from "@/lib/zod";
import { z } from "zod";
import {
  ChevronLeft,
  ChevronRight,
  LoaderCircle,
  Send,
  Trash,
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
import Image from "next/image";
import ProvidedDetails from "./provided-details";

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
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const form = useForm<z.infer<typeof campusMaintenanceSchema>>({
    resolver: zodResolver(campusMaintenanceSchema),
    defaultValues: {
      type: "",
      media: [],
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
      if (upload) {
        setUploadedFiles((prev) => {
          const newFiles = [...prev, upload.path];
          form.setValue("media", newFiles); // Use the updated files here
          return newFiles; // Return the updated state
        });
      }
    }
    setIsUploading(false);
  };

  const deleteFile = async (file: string) => {
    const { data, error } = await supabase.storage
      .from(`evidences`)
      .remove([file]);
    if (data) {
      setUploadedFiles((prev) => {
        const newFiles = prev.filter((item) => item !== file);
        form.setValue("media", newFiles);
        return newFiles;
      });
    }
  };

  const onSubmit = async (values: z.infer<typeof campusMaintenanceSchema>) => {
    const res = await execute({
      ...values,
      userId: data?.user.id,
    });
    console.log(res);

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
    router.push(`/report-progress/cmr/${res[0]?.id}`);
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
            {uploadedFiles.length > 0 ? (
              <div className=" space-y-4 mb-4">
                <span className="text-sm">
                  No. of uploaded files:{" "}
                  <span className=" font-bold">{uploadedFiles.length}</span>
                </span>
                <div className=" grid grid-cols-4 gap-4">
                  {uploadedFiles.map((path, index) => (
                    <div
                      className="relative rounded-xl border border-primary"
                      key={index}
                    >
                      <Image
                        src={fileUrl + path}
                        width={100}
                        height={100}
                        alt="Rounded picture"
                        className="rounded-xl object-cover"
                      />
                      <button
                        className="absolute bottom-0 right-0 p-1 bg-red-500 rounded-full transform translate-x-1/4 translate-y-1/4"
                        aria-label="Delete"
                        type="button"
                        onClick={() => deleteFile(path)}
                      >
                        <Trash className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
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
          <ProvidedDetails values={form.getValues()} />
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
              {isPending ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <span className="flex items-center gap-1 font-bold">
                  <Send />
                  Submit
                </span>
              )}
            </Button>
          ) : null}
        </div>
      </form>
    </Form>
  );
};

export default ReportForm;
