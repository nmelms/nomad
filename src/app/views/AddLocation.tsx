import React from "react";
import * as z from "zod";
import { useEffect } from "react";
import Step1 from "../views/add-location-steps/Step1";

// TODO: probably want to fix this import alias
import { AddLocationProps, LocationData } from "@/../types";

const AddLocation: React.FC<AddLocationProps> = ({
  handleFindOnMap,
  locationLatLng,
  form,
  formSchema,
  handleUseLocation,
  gettingLocation,
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
      <div className="flex justify-center pt-4">
        <h1>Add A location</h1>
      </div>

      {/* TODO: Create a add location route */}
      <Step1
        form={form}
        formSchema={formSchema}
        handleSubmit={handleSubmit}
        handleFindOnMap={handleFindOnMap}
        handleUseLocation={handleUseLocation}
        gettingLocation={gettingLocation}
      />
    </div>
  );
};

export default AddLocation;
