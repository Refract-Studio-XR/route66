"use client";
import { Suspense } from "react";
import MapScene from "@/components/MapScene";
import TourStopsDrawer from "@/components/TourStopsDrawer";
import useMapbox from "@/hooks/useMapbox";
import { tourStops } from "@/data/artourstops";
import { muralsData } from "@/hooks/useMuralsData";

export default function TourPage() {
  const { mapContainerRef, setOnMarkerClick } = useMapbox({
    data: tourStops.map((stop) => ({
      coordinates: stop.coordinates,
      id: stop.id,
    })),
  });

  // Console log the murals data
  console.log("Murals data:", muralsData);
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-900 via-red-990 to-black text-white overflow-auto">
      <div className="container mx-auto px-3 py-4 relative">
        <MapScene mapContainerRef={mapContainerRef} />
        <Suspense fallback={<div>Loading...</div>}>
          <TourStopsDrawer setOnMapMarkerClick={setOnMarkerClick} />
        </Suspense>
      </div>
    </div>
  );
}
