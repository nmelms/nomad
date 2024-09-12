"use client";
import mapboxgl from "mapbox-gl";
import React, { useRef, useEffect, useState } from "react";
import SlideUpMenu from "./components/SideUpMenu";
mapboxgl.accessToken = process.env.NEXT_PUBLIC_NOMAD_SECRET_KEY as string;

export default function Home() {
  console.log(process.env.NEXT_PUBLIC_NOMAD_SECRET_KEY);
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current as HTMLDivElement,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  return (
    <div className="">
      <div ref={mapContainer} className="map-container h-dvh" />
      <SlideUpMenu />
    </div>
  );
}
