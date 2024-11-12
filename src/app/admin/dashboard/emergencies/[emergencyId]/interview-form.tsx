"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useContext } from "react";
import { EmergencyDataContext } from "./emergency-data-provider";
import { Calendar, CheckSquare, Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const formSchema = z.object({
  building: z.string(),
  floor: z.string(),
  room: z.string(),
  additionalLocationDetails: z.string(),
});

const InterviewForm = () => {
  const { data } = useContext(EmergencyDataContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      building: "",
      floor: "",
      room: "",
      additionalLocationDetails: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
    }
  }
  return (
    <div className="w-full border p-4 md:p-10 space-y-4">
      <h1 className="font-bold text-xl">Interview</h1>
      <div className="flex items-center justify-evenly">
        <div className="text-xs">
          <div className="flex items-center gap-1">
            <Clock size={15} className="text-primary" />
            <span className="text-muted-foreground font-semibold">
              Call start
            </span>
          </div>
          <span className=" text-sm font-semibold">
            {data?.callStart.toLocaleString()}
          </span>
        </div>
        <div className="text-xs">
          <div className="flex items-center gap-1">
            <Calendar size={15} className="text-primary" />
            <span className="text-muted-foreground font-semibold">
              Answered
            </span>
          </div>
          <span className=" text-sm font-semibold">...</span>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 max-w-3xl mx-auto py-4"
        >
          <div className="flex items-center gap-1 text-sm  text-muted-foreground">
            <CheckSquare size={15} />
            <span>Manual Data</span>
          </div>
          <FormField
            control={form.control}
            name="building"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Caller name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Caller name" type="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="building"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What is the emergency?</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter emergency Type"
                    type=""
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="building"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Emergency Status</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the current status of the emergency"
                    type=""
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="additionalLocationDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Emergency Details</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter emergency details"
                    className="h-[10em]"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4">
              <FormField
                control={form.control}
                name="building"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Building</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the building name"
                        type=""
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-4">
              <FormField
                control={form.control}
                name="floor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Floor</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the floor" type="" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-4">
              <FormField
                control={form.control}
                name="room"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Room</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter room" type="" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="additionalLocationDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Location Details</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Additional"
                    className="h-[5em]"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default InterviewForm;
