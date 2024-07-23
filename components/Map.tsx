"use client";
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
interface MapProps {
  center: {
    lng: number;
    lat: number;
  };
}

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

const Map: React.FC<MapProps> = ({ center }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [center.lng, center.lat],
      zoom: 12,
      preserveDrawingBuffer: true,
    });

    new mapboxgl.Marker().setLngLat([center.lng, center.lat]).addTo(map);

    return () => map.remove();
  }, [center]);

  return (
    <div
      ref={mapContainerRef}
      className="h-[20rem] w-[90%] mx-auto rounded-xl border"
      id="mapSS"
    />
  );
};

export default Map;
