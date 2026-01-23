"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import TourStopList from "./TourStopList";
import TourStopDetailDrawer from "./TourStopDetailDrawer";
import { LocationData, locationData } from "@/data/";
import { MarkerData } from "@/hooks/useMapbox";

type Props = {
  setOnMapMarkerClick: (callback: (data: MarkerData) => void) => void;
};

const TourStopsDrawer = ({ setOnMapMarkerClick }: Props) => {
  const urlParams = useSearchParams();
  const router = useRouter();
  const tourStopLocation = urlParams.get("location");
  const [selectedTourStop, setSelectedTourStop] = useState<LocationData | null>(
    locationData.find((stop) => stop.locationParam === tourStopLocation) || null
  );
  const [snap, setSnap] = useState<number | string | null>(0.45);

  const handleSelectTourStop = useCallback(
    (location: LocationData) => {
      setSelectedTourStop(location);
      router.push(`?location=${location.locationParam}`);
    },
    [router]
  );

  // Set up the marker click handler when component mounts
  useEffect(() => {
    setOnMapMarkerClick((data: MarkerData) => {
      const tourStop = locationData.find((stop) => stop.id === data.id);
      if (tourStop) {
        // Don't allow opening stops that are AR but have no AR URL
        const isComingSoon = tourStop.isAR && !tourStop.arURL.length;
        if (isComingSoon) return;

        handleSelectTourStop(tourStop);
      }
    });
  }, [setOnMapMarkerClick, handleSelectTourStop]);

  const handleCloseDetail = () => {
    setSelectedTourStop(null);
    router.push("/tour");
  };

  return (
    <>
      <Drawer
        open={true}
        modal={false}
        snapPoints={[0, 0.45, 1]}
        activeSnapPoint={snap}
        setActiveSnapPoint={setSnap}
      >
        <DrawerContent className="bg-black/50 backdrop-blur-md border border-white/20 h-full flex flex-col overflow-hidden max-w-[480px] md:max-w-[640px] lg:max-w-[900px] mx-auto p-0 [&>div:first-child]:hidden">
          <DrawerHeader className="text-left px-4 pt-2 pb-0 flex-shrink-0">
            <DrawerTitle className="text-white drop-shadow-lg text-3xl">
              Route 66 Remixed
            </DrawerTitle>
            <DrawerDescription className="text-gray-200 drop-shadow-md">
              Explore tour stops. Scroll to see more.
            </DrawerDescription>
            <a
              href="https://refractstudio.net"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 drop-shadow-md text-sm underline hover:text-white transition-colors"
            >
              built by refract studio
            </a>
          </DrawerHeader>
          <div className="flex-1 overflow-y-auto px-4 pb-4 min-h-0">
            <TourStopList onSelectTourStop={handleSelectTourStop} />
          </div>
        </DrawerContent>
      </Drawer>
      <TourStopDetailDrawer
        key={selectedTourStop?.id}
        tourStop={selectedTourStop}
        open={!!selectedTourStop}
        onClose={handleCloseDetail}
      />
    </>
  );
};

export default TourStopsDrawer;
