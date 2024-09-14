"use client";
import mapboxgl from "mapbox-gl";
import React, { useRef, useEffect, useState } from "react";
// you need this css or else it causes weird behavior!
import "mapbox-gl/dist/mapbox-gl.css";
import SlideUpMenu from "./components/SideUpMenu";
mapboxgl.accessToken = process.env.NEXT_PUBLIC_NOMAD_SECRET_KEY as string;

export default function Home() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const editorMode = useRef<boolean>(false);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);
  // inital run
  let slideMenu: HTMLElement | null;
  useEffect(() => {
    slideMenu = document.getElementById("slide-menu");
  }, []);

  useEffect(() => {
    console.log(editorMode);
  }, [editorMode]);

  const handleAddLocation = (): void => {
    if (slideMenu) {
      if (slideMenu.classList.contains("slide-up")) {
        slideMenu.classList.remove("slide-up");
        slideMenu.classList.add("slide-down");
      }
    }
    editorMode.current = true;
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
          console.log(newMarker);
          markerRef.current = newMarker;
        }
      }
    });
  }, [[lng, lat, zoom]]);

  return (
    <div className="">
      <div ref={mapContainer} className="map-container h-dvh" />
      <SlideUpMenu handleAddLocation={handleAddLocation} />
    </div>
  );
}
