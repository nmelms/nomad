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
import {
  faCampground,
  faCity,
  faMap,
  faMountain,
} from "@fortawesome/free-solid-svg-icons";
import supabase from "../../lib/supabaseClient";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// TODO: probably want to fix this import alias
import { AddLocationProps, LocationData } from "@/../types";

const AddLocation: React.FC<AddLocationProps> = ({
  handleFindOnMap,
  locationLatLng,
  form,
  formSchema,
}) => {
  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
    const response = await fetch("/api/addLocation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (result.success) {
      console.log("Data inserted successfully:", result.data);
    } else {
      console.error("Error inserting data:", result.error);
    }
  };

  useEffect(() => {
    if (locationLatLng.length) {
      form.setValue("latitude", locationLatLng[0]);
      form.setValue("longitude", locationLatLng[1]);
    }
  }, [locationLatLng]);

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
          {/* location Name */}
          <FormField
            name="locationName"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem className="col-span-2">
                  <FormLabel>Location Name</FormLabel>
                  <FormControl>
                    <Input
                      defaultValue={field.value}
                      placeholder="Location Name"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          ></FormField>
          {/* longitude */}
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
          {/* latitude */}
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
          {/* find on map */}
          <Button
            type="button"
            onClick={handleFindOnMap}
            className="col-span-2"
          >
            Find Location on Map
            <FontAwesomeIcon className="ps-5" icon={faMap} />
          </Button>
          {/* category */}
          <FormField
            control={form.control}
            name="category"
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
          {/* description */}
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
