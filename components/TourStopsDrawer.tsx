"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Info } from "lucide-react";
import TourStopList from "./TourStopList";
import TourStopDetailDrawer from "./TourStopDetailDrawer";
import IntroModal from "./IntroModal";
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
  const [isExpanded, setIsExpanded] = useState(false);
  const [introOpen, setIntroOpen] = useState(false);
  const [showPulse, setShowPulse] = useState(false);
  const [pulseFading, setPulseFading] = useState(false);

  useEffect(() => {
    const handler = () => { setShowPulse(true); setPulseFading(false); };
    window.addEventListener("route66_intro_pulse", handler);
    return () => window.removeEventListener("route66_intro_pulse", handler);
  }, []);

  useEffect(() => {
    if (!showPulse) return;
    const fadeTimer = setTimeout(() => setPulseFading(true), 3000);
    const removeTimer = setTimeout(() => setShowPulse(false), 4000);
    return () => { clearTimeout(fadeTimer); clearTimeout(removeTimer); };
  }, [showPulse]);

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

  // Collapse drawer when a tour stop is selected
  useEffect(() => {
    if (selectedTourStop) {
      setIsExpanded(false);
    }
  }, [selectedTourStop]);

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
          className={`${isExpanded ? 'h-[95vh]' : 'h-[52vh]'} rounded-t-2xl bg-black/50 backdrop-blur-md border-0 p-0 [&>button]:hidden flex flex-col max-w-[480px] md:max-w-[640px] lg:max-w-[900px] mx-auto transition-all duration-300`}
        >
          <SheetHeader className="text-left px-4 pt-2 pb-0 flex-shrink-0 relative !space-y-0.5">
            <div className="absolute top-4 right-3 flex items-center gap-2 z-10">
              <button
                type="button"
                onClick={() => { setShowPulse(false); setIntroOpen(true); }}
                className="relative rounded-full p-1.5 text-white/70 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
                aria-label="Tips for the tour"
              >
                {showPulse && (
                  <span
                    className="absolute inset-0 rounded-full border-2 border-white/60 animate-ping pointer-events-none"
                    style={{ opacity: pulseFading ? 0 : 1, transition: "opacity 1s ease-out" }}
                  />
                )}
                <Info className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-white/70 hover:text-white transition-colors"
                aria-label={isExpanded ? "Collapse sheet" : "Expand sheet"}
              >
              {isExpanded ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              )}
              </button>
            </div>
            <SheetTitle className="text-white drop-shadow-lg text-[1.65rem] tracking-tight pr-16">
              Route 66 Remixed
            </SheetTitle>
            <SheetDescription className="text-gray-200 drop-shadow-md text-xs leading-tight">
              Explore tour stops. Scroll to see more.
              <br />
              <a
                href="https://refractstudio.net"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 underline hover:text-white transition-colors text-[11px]"
              >built by refract studio</a>
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
      <IntroModal open={introOpen} onOpenChange={setIntroOpen} />
    </>
  );
};

export default TourStopsDrawer;
