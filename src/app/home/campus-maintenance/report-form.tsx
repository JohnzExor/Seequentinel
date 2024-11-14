"use client";

import supabase, { fileUrl } from "@/lib/storage";
import { v4 as uuidv4 } from "uuid";

import { useServerAction } from "zsa-react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  LoaderCircle,
  Send,
  Trash,
  UploadCloudIcon,
} from "lucide-react";
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
import campusMaintenanceAction from "./actions";
import { campusLocations } from "@/components/locations";
import { Textarea } from "@/components/ui/textArea";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverTrigger } from "@/components/ui/popOver";
import { cn } from "@/lib/utils";
import { PopoverContent } from "@radix-ui/react-popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export const problems: {
  level: "critical" | "high" | "medium" | "low";
  description: string;
  issues: string[];
}[] = [
  {
    level: "critical",
    description: "Immediate attention needed to avoid serious risks or damage.",
    issues: [
      "Leaking Pipe",
      "Elevator Malfunction",
      "Overheating Server",
      "Blocked Fire Exit",
      "Faulty Fire Alarm",
      "Electrical Short Circuit",
      "Gas Leak",
      "Power Outage",
      "Collapsed Ceiling",
      "Sewage Backup",
    ],
  },
  {
    level: "high",
    description:
      "Major issues that can cause serious inconvenience if left unresolved.",
    issues: [
      "Broken Air Conditioning",
      "Faulty Projector",
      "Unresponsive Security Camera",
      "Leaking Roof",
      "Broken Glass Door",
      "Non-functional Sprinkler System",
      "Failed Water Heater",
      "Malfunctioning Entry Gate",
      "Inoperable Emergency Exit Sign",
    ],
  },
  {
    level: "medium",
    description: "Problems that should be fixed soon but aren't urgent.",
    issues: [
      "Flickering Lights",
      "Clogged Drain",
      "Defective PA System",
      "Broken Desk",
      "Malfunctioning Vending Machine",
      "Loose Flooring Tile",
      "Slow Wi-Fi Connection",
      "Worn-Out Carpeting",
      "Non-Functioning Restroom Faucet",
      "Stuck Window",
    ],
  },
  {
    level: "low",
    description: "Minor issues that don't require immediate action.",
    issues: [
      "Damaged Door",
      "Cracked Window",
      "Peeling Paint",
      "Squeaky Door",
      "Broken Trash Bin",
      "Wobbly Chair",
      "Faded Signage",
      "Minor Wall Dent",
      "Unstable Shelving",
      "Loose Doorknob",
    ],
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
    .upload(`/CampusMaintenance/${uuidv4()}/image-${imageCount}.jpg`, file, {
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
    campusMaintenanceAction
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

  const [searchIssue, setSearchIssue] = useState("");

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

    const { location, building, room, others } = updatedLocation;

    const formatted = [location, building, room, others]
      .filter(Boolean) // Filters out any empty or falsy values
      .join(", ");

    // Update both the form value and the state
    form.setValue("location", formatted);
    setRawLocation(updatedLocation);
  };

  const form = useForm<z.infer<typeof reportSchema>>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      reportType: "CampusMaintenance",
      problemType: "",
      attachments: [],
      location: "",
      userId: data?.user.id,
      details: "",
    },
  });

  const handleFileOnchange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
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
      "problemType" | "attachments" | "location" | "details" | "status"
    > = ["problemType", "attachments", "location", "details", "status"];

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
          <>
            {/* Display problem levels and descriptions */}
            {problems.map(({ level, description }, index) => (
              <div
                className="text-sm text-muted-foreground space-x-2"
                key={index}
              >
                <Badge variant={level}>{level}</Badge>
                <span>{description}</span>
              </div>
            ))}

            {/* Form field for selecting problem types */}
            <FormField
              control={form.control}
              name="problemType"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? field.value : "Search a problem"}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0 shadow-xl">
                      <Command>
                        <CommandInput
                          placeholder="Search a problem..."
                          className="h-9"
                          onValueChange={(value) => setSearchIssue(value)} // Handling search
                        />
                        <CommandList>
                          <CommandEmpty>No problem found.</CommandEmpty>
                          {problems.map(({ level, issues }, index) => (
                            <CommandGroup
                              key={index}
                              heading={<Badge variant={level}>{level}</Badge>}
                            >
                              {issues
                                .filter((issue) =>
                                  issue
                                    .toLowerCase()
                                    .includes(searchIssue.toLowerCase())
                                )
                                .map((issue, issueIndex) => (
                                  <CommandItem
                                    value={issue}
                                    key={issueIndex}
                                    onSelect={() => {
                                      field.onChange(issue);
                                    }}
                                  >
                                    <span>{issue}</span>
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        issue === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                            </CommandGroup>
                          ))}
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Select the problem you are facing.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
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
              capture="environment"
              accept="/image/*"
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

        {currentStep === 3 ? (
          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Provide addtional details"
                    {...field}
                    disabled={isPending}
                    className="h-[15em]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : null}

        {currentStep === 4 ? (
          <ProvidedDetails
            values={form.getValues()}
            isUploading={isUploading}
          />
        ) : null}

        <div className="flex items-center justify-between">
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
          {currentStep < 4 ? (
            <Button
              disabled={disableButton(currentStep)}
              type="button"
              onClick={nextStep}
              className=" ml-auto"
            >
              <ChevronRight />
            </Button>
          ) : null}
          {currentStep === 4 ? (
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
