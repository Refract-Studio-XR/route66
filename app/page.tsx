"use client";

import { useState } from "react";
import TourPlayer from "@/components/TourPlayer";
import { tourStops } from "@/data/tourStops";
export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStopIndex, setCurrentStopIndex] = useState(0);

  const handleNext = () => {
    setCurrentStopIndex((prev) =>
      prev < tourStops.length - 1 ? prev + 1 : prev
    );
  };

  const handlePrevious = () => {
    setCurrentStopIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <TourPlayer
      currentStop={tourStops[currentStopIndex]}
      isPlaying={isPlaying}
      onPlayPause={() => setIsPlaying(!isPlaying)}
      onNext={handleNext}
      onPrevious={handlePrevious}
      progress={0}
      onProgressChange={() => {}}
    />
  );
}
