"use client";

import MapScene from "@/components/MapScene";
import TourStopsDrawer from "@/components/TourStopsDrawer";
import useMapbox from "@/hooks/useMapbox";
import { tourStops } from "@/data/tourStops";

export default function TourPage() {
  const { mapContainerRef, setOnMarkerClick } = useMapbox({
    data: tourStops.map((stop) => ({
      coordinates: stop.coordinates,
      id: stop.id,
    })),
  });
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-900 via-red-990 to-black text-white overflow-auto">
      <div className="container mx-auto px-3 py-4 relative">
        <MapScene mapContainerRef={mapContainerRef} />
        <TourStopsDrawer setOnMapMarkerClick={setOnMarkerClick} />
      </div>
    </div>
  );
}
