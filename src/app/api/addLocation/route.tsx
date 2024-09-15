// app/api/locations/route.ts

import { NextResponse } from "next/server";
import supabase from "../../../lib/supabaseClient"; // Adjust the path if necessary

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const { locationName, latitude, longitude, description } = data;

    const { data: insertedData, error } = await supabase
      .from("Locations")
      .insert({
        location_name: locationName,
        lat_lng: [latitude, longitude],
        description,
      });

    if (error) {
      console.error("Error inserting data:", error);
      return NextResponse.json({ success: false, error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: insertedData });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { success: false, error: "Unexpected error occurred" },
      { status: 500 }
    );
  }
}
