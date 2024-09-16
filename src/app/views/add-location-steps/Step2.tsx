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
    <Form {...form}>
      <form
        className="grid gap-5 grid-cols-2 p-5"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        {/* location Name */}
        <FormField
          name="fakeName"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Location Name</FormLabel>
              <FormControl>
                <Input placeholder="Location Name" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* longitude */}

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default Step2;
