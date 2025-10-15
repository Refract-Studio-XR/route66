"use client";
import { Suspense, useMemo } from "react";
import Image from "next/image";
import MapScene from "@/components/MapScene";
import TourStopsDrawer from "@/components/TourStopsDrawer";
import LoadingScreen from "@/components/LoadingScreen";
import useMapbox from "@/hooks/useMapbox";
import {
  locationData,
  artistData,
  artistImages,
  artistSquareImages,
} from "@/data";

export default function TourPage() {
  // Enhance location data with hasArtistStatement flag
  const enhancedLocationData = useMemo(() => {
    return locationData.map((location) => {
      const hasArtistStatement = artistData.some(
        (artist) =>
          Math.floor(parseFloat(artist.stop)) ===
            Math.floor(parseFloat(location.stop)) &&
          artist.artiststatement &&
          artist.artiststatement.length > 0
      );
      return { ...location, hasArtistStatement };
    });
  }, []);

  const { mapContainerRef, setOnMarkerClick, isMapLoaded } = useMapbox({
    data: enhancedLocationData,
  });

  return (
    <>
      <LoadingScreen isMapLoaded={isMapLoaded} />

      {/* Preload all artist images using Next.js Image priority */}
      <div className="hidden">
        {Object.values(artistSquareImages).map((src) => (
          <Image
            key={src}
            src={src}
            alt=""
            width={64}
            height={64}
            priority
          />
        ))}
        {Object.values(artistImages).map((src) => (
          <Image
            key={src}
            src={src}
            alt=""
            width={150}
            height={150}
            priority
          />
        ))}
      </div>

      <div className="container mx-auto max-w-[480px] md:max-w-[640px] lg:max-w-[900px] px-3 pt-2 pb-4 relative">
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
