// components/MapboxSearchMap.tsx
"use client"; // Ensure this component is recognized as a client component
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

interface MapboxSearchMapProps {
  onSelect: (place: {
    geometry: { coordinates: [number, number] };
    place_name: string;
  }) => void;
}

const MapboxSearchMap: React.FC<MapboxSearchMapProps> = ({ onSelect }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const geocoderRef = useRef<MapboxGeocoder | null>(null);

  useEffect(() => {
    // Set Mapbox access token
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

    if (!geocoderRef.current) {
      // Initialize the Mapbox Geocoder with the mapboxgl reference
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
      });

      // Handle the result event from the geocoder
      geocoder.on("result", (e: any) => {
        const place = e.result;
        onSelect({
          geometry: { coordinates: [place.center[0], place.center[1]] },
          place_name: place.place_name,
        });
      });

      // Add the geocoder to the container
      if (mapContainerRef.current) {
        geocoder.addTo(mapContainerRef.current);
        // Apply Tailwind classes to the input element
        const inputElement = mapContainerRef.current.querySelector(
          ".mapboxgl-ctrl-geocoder--input"
        );
        if (inputElement) {
          inputElement.classList.add(
            "!bg-gray-100",
            "text-black",
            "rounded",
            "outline-none",
            "border-none",
            "focus:border-none",
            "focus:ring-0",
            "focus:outline-none"
          );
        }
      }

      // Store the geocoder instance in the ref
      geocoderRef.current = geocoder;
    }

    // Cleanup on unmount
    return () => {
      if (geocoderRef.current) {
        geocoderRef.current.clear();
      }
    };
  }, [onSelect]);

  return (
    <div ref={mapContainerRef} style={{ height: "50px", width: "100%" }} />
  );
};

export default MapboxSearchMap;
