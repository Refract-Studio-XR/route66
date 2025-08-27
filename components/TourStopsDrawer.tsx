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
import { TourStop, tourStops } from "@/data/artourstops";
import { MarkerData } from "@/hooks/useMapbox";

type Props = {
  setOnMapMarkerClick: (callback: (data: MarkerData) => void) => void;
};

const TourStopsDrawer = ({ setOnMapMarkerClick }: Props) => {
  const urlParams = useSearchParams();
  const router = useRouter();
  const tourStopLocation = urlParams.get("location");
  const [selectedTourStop, setSelectedTourStop] = useState<TourStop | null>(
    tourStops.find((stop) => stop.location === tourStopLocation) || null
  );

  const handleSelectTourStop = (stop: TourStop) => {
    setSelectedTourStop(stop);
    router.push(`?location=${stop.location}`);
  };

  // Set up the marker click handler when component mounts
  useEffect(() => {
    setOnMapMarkerClick((data: MarkerData) => {
      console.log("howdy");
      const tourStop = tourStops.find((stop) => stop.id === data.id);
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
          className="h-[45vh] rounded-t-2xl bg-zinc-900 border border-zinc-800 border-b-0 p-0 [&>button]:hidden flex flex-col"
        >
          <SheetHeader className="text-left p-4 pb-2 flex-shrink-0">
            <SheetTitle className="text-white">Tour Stops</SheetTitle>
            <SheetDescription className="text-gray-400">
              Explore various tour stops. Scroll to see more details.
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
