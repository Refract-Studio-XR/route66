"use client";
import { Suspense } from "react";
import MapScene from "@/components/MapScene";
import TourStopsDrawer from "@/components/TourStopsDrawer";
import useMapbox from "@/hooks/useMapbox";
import { allTourStops } from "@/data";

export default function TourPage() {
  const { mapContainerRef, setOnMarkerClick } = useMapbox({
    data: allTourStops,
  });

  return (
    <div
      className="min-h-screen text-white overflow-auto"
      style={{
        backgroundImage: "url('/route66bg.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto px-3 py-4 relative">
        <MapScene mapContainerRef={mapContainerRef} />
        <Suspense fallback={<div>Loading...</div>}>
          <TourStopsDrawer setOnMapMarkerClick={setOnMarkerClick} />
        </Suspense>
      </div>
    </div>
  );
}
