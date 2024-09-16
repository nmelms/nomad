import React from "react";
import * as z from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const formSchema = z.object({
  locationName: z.string().nonempty("Location Name is required"),
  longitude: z.number(),
  latitude: z.number(),
  category: z.string(),
  description: z.string(),
  pics: z.string().optional(),
  fakeName: z.string(),
});
interface Step1Props {
  form: UseFormReturn<FormData>; // Type should be inferred from the schema
  handleSubmit: (data: FormData) => Promise<void>;
  formSchema: any;
}

type FormData = z.infer<typeof formSchema>;

const Step2: React.FC<Step1Props> = ({ form, formSchema, handleSubmit }) => {
  return (
    <>
      <h1>More Info</h1>
      <Form {...form}>
        <form
          className="grid gap-5 grid-cols-2 p-5"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          {/* Cell Service */}
          <Select>
            <SelectTrigger className="col-span-2">
              <SelectValue placeholder="Cell Service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="bad">Bad</SelectItem>
              <SelectItem value="okay">Okay</SelectItem>
              <SelectItem value="excellent">Excellent</SelectItem>
            </SelectContent>
          </Select>
          {/* big rig accessible */}
          <Select>
            <SelectTrigger className="col-span-2">
              <SelectValue placeholder="Acessible with Larger Rigs" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Yes</SelectItem>
              <SelectItem value="bad">No</SelectItem>
            </SelectContent>
          </Select>
          {/* 4wd necessary */}
          <Select>
            <SelectTrigger className="col-span-2">
              <SelectValue placeholder="Acessible with 2wd" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Yes</SelectItem>
              <SelectItem value="bad">No</SelectItem>
            </SelectContent>
          </Select>
          {/* 4wd necessary */}
          <Select>
            <SelectTrigger className="col-span-2">
              <SelectValue placeholder="Is there Water Available" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="potable">Potable Water</SelectItem>
              <SelectItem value="natual">Natural Source</SelectItem>
              <SelectItem value="none">No water</SelectItem>
            </SelectContent>
          </Select>
          {/* Safe */}
          <Select>
            <SelectTrigger className="col-span-2">
              <SelectValue placeholder="Did you feel Safe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="neutral">Neutral</SelectItem>
              <SelectItem value="no">Sketchy</SelectItem>
            </SelectContent>
          </Select>
          {/* Showers */}
          <Select>
            <SelectTrigger className="col-span-2">
              <SelectValue placeholder="Showers Available?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">no</SelectItem>
            </SelectContent>
          </Select>

          <Button className="col-span-2" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
};

export default Step2;
