"use client";

import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import TourStopList from "./TourStopList";
import TourStopDetailDrawer from "./TourStopDetailDrawer";
import { allTourStops, TourStop, LocationData, locationData } from "@/data/";
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

  const handleSelectTourStop = (location: LocationData) => {
    setSelectedTourStop(location);
    router.push(`?location=${location.locationParam}`);
  };

  // Set up the marker click handler when component mounts
  useEffect(() => {
    setOnMapMarkerClick((data: MarkerData) => {
      const tourStop = allTourStops.find((stop) => stop.id === data.id);
      if (tourStop) {
        handleSelectTourStop(tourStop);
      }
    });
  }, [setOnMapMarkerClick]);

  const handleCloseDetail = () => {
    setSelectedTourStop(null);
    router.push("/tour");
  };

  return (
    <>
      <Sheet
        open={true}
        modal={false}
      >
        <SheetContent
          side="bottom"
          className="h-[45vh] rounded-t-2xl bg-black/50 backdrop-blur-md border border-white/20 p-0 [&>button]:hidden flex flex-col max-w-[480px] md:max-w-[640px] lg:max-w-[900px] mx-auto"
        >
          <SheetHeader className="text-left p-4 pb-2 flex-shrink-0">
            <SheetTitle className="text-white drop-shadow-lg text-3xl">
              Route 66 Remixed
            </SheetTitle>
            <SheetDescription className="text-gray-200 drop-shadow-md">
              Explore tour stops. Scroll to see more.
            </SheetDescription>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto px-4 pb-4 min-h-0">
            <TourStopList onSelectTourStop={handleSelectTourStop} />
          </div>
        </SheetContent>
      </Sheet>
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
