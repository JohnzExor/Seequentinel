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
  FormLabel,
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
import Stepper from "./stepper";
import { Label } from "@/components/ui/label";

export const UploadMedia = async (file: File) => {
  const { data, error } = await supabase.storage
    .from("evidences")
    .upload(`/${uuidv4()}.jpg`, file, {
      cacheControl: "3600",
      upsert: true,
    });
  return data;
};

const ReportForm = () => {
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
    console.log(file);
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
    router.push("/report/report-progress");
    form.reset();
  };

  const [currentStep, setCurrentStep] = useState(0);
  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const disableButton = (index: number) => {
    const fields: Array<"type" | "media" | "location" | "userId" | "status"> = [
      "type",
      "media",
      "location",
      "userId",
      "status",
    ];

    const check = form.getValues(fields[index]);
    return check ? false : true;
  };

  return (
    <div className="flex flex-col">
      <Stepper currentStep={currentStep} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-4">
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
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">Picture</Label>
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
            {currentStep < 2 ? (
              <Button
                disabled={disableButton(currentStep)}
                type="button"
                onClick={nextStep}
                className=" ml-auto"
              >
                <ChevronRight />
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
  );
};

export default ReportForm;
