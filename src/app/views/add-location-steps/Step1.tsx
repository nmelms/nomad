import React from "react";
import * as z from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMap,
  faMountain,
  faCity,
  faCampground,
  faCrosshairs,
} from "@fortawesome/free-solid-svg-icons";
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

// Define the schema and its inferred type
const formSchema = z.object({
  locationName: z.string().nonempty("Location Name is required"),
  longitude: z.number(),
  latitude: z.number(),
  category: z.string(),
  description: z.string(),
  pics: z.string().optional(),
  fakeName: z.string(),
});

type FormData = z.infer<typeof formSchema>;

interface Step1Props {
  form: UseFormReturn<FormData>; // Type should be inferred from the schema
  handleSubmit: (data: FormData) => Promise<void>;
  handleFindOnMap: () => void;
  handleUseLocation: () => void;
  gettingLocation: boolean;
  formSchema: any;
}

const Step1: React.FC<Step1Props> = ({
  form,
  handleSubmit,
  handleFindOnMap,
  handleUseLocation,
  gettingLocation,
}) => {
  return (
    <Form {...form}>
      <form
        className="grid gap-5 grid-cols-2 p-5"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        {/* location Name */}
        <FormField
          name="locationName"
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
        <FormField
          name="longitude"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Lng</FormLabel>
              <FormControl>
                <Input
                  placeholder="lng"
                  type="text"
                  {...field}
                  onChange={(event) => field.onChange(+event.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* latitude */}
        <FormField
          name="latitude"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Lat</FormLabel>
              <FormControl>
                <Input
                  placeholder="lat"
                  type="text"
                  {...field}
                  onChange={(event) => field.onChange(+event.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* find on map */}
        <Button type="button" onClick={handleFindOnMap} className="col-span-2">
          Find Location on Map
          <FontAwesomeIcon className="ps-5" icon={faMap} />
        </Button>
        {/* use current location */}
        <Button
          type="button"
          onClick={handleUseLocation}
          className="col-span-2"
        >
          <span className="pe-5">Use Current Location</span>
          <FontAwesomeIcon
            className={`${gettingLocation ? "spin" : ""}`}
            icon={faCrosshairs}
          />
        </Button>
        {/* category */}
        <FormField
          name="category"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-2">
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select A Category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="dispersed">
                    <FontAwesomeIcon className="pe-5" icon={faMountain} />
                    Dispersed Campsite
                  </SelectItem>
                  <SelectItem value="city">
                    <FontAwesomeIcon className="pe-5" icon={faCity} />
                    City Campsite
                  </SelectItem>
                  <SelectItem value="established">
                    <FontAwesomeIcon className="pe-5" icon={faCampground} />
                    Established Campsite
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Pictures */}
        <FormField
          name="pics"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Pictures</FormLabel>
              <FormControl>
                <Input
                  placeholder="Upload pictures"
                  type="file"
                  multiple
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* description */}
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about the place"
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default Step1;
