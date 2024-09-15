import React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap } from "@fortawesome/free-solid-svg-icons";
import supabase from "../../lib/supabaseClient";
// TODO: probably want to fix this import alias
import { AddLocationProps, LocationData } from "@/../types";

const fromSchema = z.object({
  locationName: z.string(),
  longitude: z.number(),
  latitude: z.number(),
  description: z.string(),
});

// TODO: make a data interface
const handleSubmit = async (data: LocationData) => {
  let payload = {
    location_name: data.locationName,
    lat_lng: [data.latitude, data.longitude],
    description: data.description,
  };
  const { data: insertedData, error } = await supabase
    .from("Locations")
    .insert(payload);

  if (error) {
    console.error("Error inserting data:", error);
    return { success: false, error };
  }

  console.log("Data inserted successfully:", insertedData);
  return { success: true, data: insertedData };
};

const AddLocation: React.FC<AddLocationProps> = ({
  handleFindOnMap,
  locationLatLng,
}) => {
  const form = useForm<z.infer<typeof fromSchema>>({
    resolver: zodResolver(fromSchema),
    defaultValues: {
      locationName: "",
      longitude: 0,
      latitude: 0,
      description: "",
    },
  });

  useEffect(() => {
    if (locationLatLng.length) {
      form.setValue("latitude", locationLatLng[0]);
      form.setValue("longitude", locationLatLng[1]);
    }
  }, [locationLatLng, form]);

  return (
    <div
      id="add-location-view"
      className="bg-white z-10 active-view text-black"
    >
      <h1>Add A location</h1>
      {/* TODO: Create a add location route */}
      <Form {...form}>
        <form
          className="grid gap-5 grid-cols-2 p-5"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormField
            name="locationName"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem className="col-span-2">
                  <FormLabel>Location Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Location Name" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          ></FormField>
          <FormField
            name="longitude"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem className="col-span-1">
                  <FormLabel>Lng</FormLabel>
                  <FormControl>
                    <Input
                      id="lngField"
                      placeholder="lng"
                      type="text"
                      {...field}
                      onChange={(event) => field.onChange(+event.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          ></FormField>
          <FormField
            name="latitude"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem className="col-span-1">
                  <FormLabel>Lat</FormLabel>
                  <FormControl>
                    <Input
                      id="latField"
                      placeholder="lat"
                      type="text"
                      style={{ appearance: "none" }}
                      {...field}
                      onChange={(event) => field.onChange(+event.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          ></FormField>
          <Button
            type="button"
            onClick={handleFindOnMap}
            className="col-span-2"
          >
            Find Location on Map
            <FontAwesomeIcon className="ps-5" icon={faMap} />
          </Button>
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem className="col-span-2">
                  <FormLabel>description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about the place"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          ></FormField>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default AddLocation;
