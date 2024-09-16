"use client";
import mapboxgl from "mapbox-gl";
import * as z from "zod";
import React, { useRef, useEffect, useState } from "react";
// you need this css or else it causes weird behavior!
import "mapbox-gl/dist/mapbox-gl.css";
import SlideUpMenu from "./components/SideUpMenu";
import AddLocation from "./views/AddLocation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
mapboxgl.accessToken = process.env.NEXT_PUBLIC_NOMAD_SECRET_KEY as string;

const formSchema = z.object({
  locationName: z.string(),
  longitude: z.number(),
  latitude: z.number(),
  category: z.string(),
  description: z.string(),
  pics: z.string(),
  cellService: z.string(),
  twd: z.string(),
  largeRigs: z.string(),
  showers: z.string(),
  safe: z.string(),
  water: z.string(),
});
export default function Home() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const editorMode = useRef<boolean>(false);
  const [view, setView] = useState<string>("home");
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [locationLatLng, setLocationLatLng] = useState<number[] | []>([]);
  const [zoom, setZoom] = useState(9);
  const [gettingLocation, setGettingLocation] = useState<boolean>(false);

  // inital run
  let slideMenu: HTMLElement | null;
  useEffect(() => {
    slideMenu = document.getElementById("slide-menu");
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      locationName: "",
      longitude: 0,
      latitude: 0,
      category: "",
      description: "",
      pics: "",
      cellService: "",
      largeRigs: "",
      twd: "",
      showers: "",
      safe: "",
      water: "",
    },
  });

  const handleAddLocation = (): void => {
    setView("add_location");

    if (slideMenu) {
      if (slideMenu.classList.contains("slide-up")) {
        slideMenu.classList.remove("slide-up");
        slideMenu.classList.add("slide-down");
      }
    }
  };

  const handleFindOnMap = () => {
    setView("home");
    editorMode.current = true;
  };

  const handleUseLocation = () => {
    setGettingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          form.setValue("latitude", position.coords.latitude);
          form.setValue("longitude", position.coords.longitude);
          setGettingLocation(false);
        },
        (error) => {
          console.error(`Error: ${error.message}`);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current as HTMLDivElement,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on("click", (e) => {
      // TODO: for now im using a 'editor mode' to add a location with the map.
      // Eventually possibly add a popup on longpress for mobile useres or a double click for desktop.
      if (map.current && editorMode.current) {
        const { lng, lat } = e.lngLat.wrap();
        const coords: [number, number] = [lng, lat];
        // only allows one pin the be on the map at a time
        if (markerRef.current) {
          markerRef.current.setLngLat(coords);
        } else {
          const newMarker = new mapboxgl.Marker()
            .setLngLat(coords)
            .addTo(map.current);
          markerRef.current = newMarker;
        }

        setTimeout(() => {
          setView("add_location");
          setLocationLatLng([lng, lat]);
        }, 2000);
      }
    });
  }, [[lng, lat, zoom]]);

  return (
    <>
      <div ref={mapContainer} className="map-container h-dvh" />
      {view === "add_location" && (
        <AddLocation
          handleFindOnMap={handleFindOnMap}
          locationLatLng={locationLatLng}
          form={form}
          formSchema={formSchema}
          handleUseLocation={handleUseLocation}
          gettingLocation={gettingLocation}
        />
      )}
      <SlideUpMenu handleAddLocation={handleAddLocation} />
    </>
  );
}
