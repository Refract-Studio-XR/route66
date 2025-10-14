"use client";
import { Suspense } from "react";
import Image from "next/image";
import MapScene from "@/components/MapScene";
import TourStopsDrawer from "@/components/TourStopsDrawer";
import LoadingScreen from "@/components/LoadingScreen";
import useMapbox from "@/hooks/useMapbox";
import { allTourStops } from "@/data";

export default function TourPage() {
  const { mapContainerRef, setOnMarkerClick, isMapLoaded } = useMapbox({
    data: allTourStops,
  });

  return (
    <>
      <LoadingScreen isMapLoaded={isMapLoaded} />
      <div className="container mx-auto max-w-[480px] md:max-w-[640px] lg:max-w-[900px] px-3 py-4 relative">
        <MapScene mapContainerRef={mapContainerRef} />
        <div className="absolute top-0 left-0 z-10">
          <Image
            src="/rt66logo.png"
            alt="Route 66 Logo"
            width={79}
            height={79}
            className="object-contain"
            priority
          />
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <TourStopsDrawer setOnMapMarkerClick={setOnMarkerClick} />
        </Suspense>
      </div>
    </>
  );
}
