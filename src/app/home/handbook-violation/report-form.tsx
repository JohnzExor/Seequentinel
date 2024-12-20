"use client";

import supabase, { fileUrl } from "@/lib/storage";
import { v4 as uuidv4 } from "uuid";

import { useServerAction } from "zsa-react";
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
import { reportSchema } from "@/lib/zod";
import { z } from "zod";
import {
  ChevronLeft,
  ChevronRight,
  LoaderCircle,
  Send,
  Trash,
  UploadCloudIcon,
} from "lucide-react";

// date picker imports
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
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
import Image from "next/image";
import ProvidedDetails from "./provided-details";
import handbookViolationAction from "./actions";
import { Textarea } from "@/components/ui/textArea";
import { campusLocations } from "@/components/locations";

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

export const UploadMedia = async (file: File, imageCount: number) => {
  const maxSizeMB = 50;
  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  // Check if the file size exceeds the 50MB limit
  if (file.size > maxSizeBytes) {
    throw new Error(`File is too large. Maximum size is ${maxSizeMB}MB.`);
  }
  const { data, error } = await supabase.storage
    .from("attachments")
    .upload(`/HandbookViolation/${uuidv4()}/image-${imageCount}.jpg`, file, {
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
  const { toast } = useToast();
  const { execute, isError, error, isPending, isSuccess } = useServerAction(
    handbookViolationAction
  );

  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const [rawLocation, setRawLocation] = useState({
    location: "",
    building: "",
    room: "",
    others: "",
  });

  const selectedLocation = campusLocations.find(
    ({ name }) => name === rawLocation.location
  );

  const selectedBuilding = selectedLocation?.buildings.find(
    ({ name }) => name === rawLocation.building
  );

  const handleOtherLocationChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const updatedLocation = { ...rawLocation, others: e.target.value }; // Use 'others' correctly here
    const { location, building, room, others } = updatedLocation;

    // Format the location including the 'others' field
    const formatted = [location, building, room, others]
      .filter(Boolean) // Filters out any empty or falsy values
      .join(", ");

    // Update both the form value and the state
    form.setValue("location", formatted);
    setRawLocation(updatedLocation);
  };

  const handleLocationChange = (value: string) => {
    // Use the new value directly, rather than relying on stale state.
    const updatedLocation = { ...rawLocation, room: value };

    const { location, building, room } = updatedLocation;

    const formatted = [location, building, room]
      .filter(Boolean) // Filters out any empty or falsy values
      .join(", ");

    // Update both the form value and the state
    form.setValue("location", formatted);
    setRawLocation(updatedLocation);
  };

  const form = useForm<z.infer<typeof reportSchema>>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      reportType: "HandbookViolation",
      problemType: "",
      attachments: [],
      violationDate: "" as unknown as Date,
      location: "",
      details: "",
      userId: data?.user.id,
      violatorName: "",
    },
  });

  const handleFileOnchange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    console.log(file);
    if (file) {
      setIsUploading(true);
      const upload = await UploadMedia(file, uploadedFiles.length);
      if (upload) {
        setUploadedFiles((prev) => {
          const newFiles = [...prev, upload.path];
          form.setValue("attachments", newFiles); // Use the updated files here
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
        form.setValue("attachments", newFiles);
        return newFiles;
      });
    }
  };

  const onSubmit = async (values: z.infer<typeof reportSchema>) => {
    if (isUploading) {
      return toast({
        description: "Media is still uploading...",
      });
    }

    try {
      const res = await execute({
        ...values,
        userId: data?.user.id,
      });
      toast({
        title: "Submited Successfully",
        description: "Your submitted report is now on request page",
      });
      console.log(res);
    } catch (error) {
      console.error(error);
      toast({
        description: "Submission failed",
      });
    }
  };
  const disableButton = (index: number) => {
    const fields: Array<
      | "problemType"
      | "violatorName"
      | "violationDate"
      | "attachments"
      | "location"
      | "details"
    > = [
      "problemType",
      "violatorName",
      "violationDate",
      "attachments",
      "location",
      "details",
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
            name="problemType"
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
            name="violatorName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Violator Name"
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
            name="violationDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
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

        {currentStep === 3 ? (
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
              accept="image/*"
            />
            {isUploading ? (
              <span className="text-xs flex items-center gap-1 ml-auto text-muted-foreground animate-pulse">
                <UploadCloudIcon />
                Uploading
              </span>
            ) : null}
          </div>
        ) : null}

        {currentStep === 4 ? (
          <>
            {/* Display Selected Values */}
            <span className="text-primary font-bold">
              {[rawLocation.location, rawLocation.building, rawLocation.room]
                .filter(Boolean) // Filters out any empty or falsy values
                .join(", ")}
            </span>
            {/* Location Select */}
            <Select
              value={rawLocation.location}
              onValueChange={(value) =>
                setRawLocation((prev) => ({
                  ...prev,
                  location: value,
                  building: "",
                  room: "",
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                {campusLocations.map(({ name }, index) => (
                  <SelectItem value={name} key={index}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* Building Select */}
            <Select
              value={rawLocation.building}
              onValueChange={(value) =>
                setRawLocation((prev) => ({
                  ...prev,
                  building: value,
                  room: "",
                }))
              }
            >
              <SelectTrigger disabled={!rawLocation.location}>
                <SelectValue placeholder="Building" />
              </SelectTrigger>
              <SelectContent>
                {selectedLocation?.buildings.map(({ name }, index) => (
                  <SelectItem value={name} key={index}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* Room Select */}
            <Select
              value={rawLocation.room}
              onValueChange={handleLocationChange}
            >
              <SelectTrigger disabled={!rawLocation.building}>
                <SelectValue placeholder="Room" />
              </SelectTrigger>
              <SelectContent>
                {selectedBuilding?.rooms.map((room, index) => (
                  <SelectItem value={room} key={index}>
                    {room}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Textarea
              value={rawLocation.others}
              onChange={handleOtherLocationChange}
              placeholder="Others"
            />
          </>
        ) : null}

        {currentStep === 5 ? (
          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem>
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

        {currentStep === 6 ? (
          <ProvidedDetails
            values={form.getValues()}
            isUploading={isUploading}
          />
        ) : null}

        <div className="flex justify-between mt-4">
          {currentStep > 0 ? (
            <Button
              disabled={isPending || isSuccess}
              type="button"
              variant={"secondary"}
              onClick={prevStep}
            >
              <ChevronLeft />
            </Button>
          ) : null}
          {currentStep < 6 ? (
            <Button
              disabled={disableButton(currentStep)}
              type="button"
              onClick={nextStep}
              className=" ml-auto"
            >
              <ChevronRight />
            </Button>
          ) : null}
          {currentStep === 6 ? (
            <Button
              type="submit"
              className="w-2/4"
              disabled={isPending || isSuccess}
            >
              {isPending || isSuccess ? (
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
