"use client";

import { useState, useEffect } from "react";
import TourPlayer from "@/components/TourPlayer";
import { tourStops } from "@/data/tourStops";

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStopIndex, setCurrentStopIndex] = useState(0);

  // Progress simulation
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isPlaying) {
      intervalId = setInterval(() => {
        setProgress((prev) => {
          if (prev >= tourStops[currentStopIndex].duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPlaying, currentStopIndex]);

  const handleNext = () => {
    setCurrentStopIndex((prev) =>
      prev < tourStops.length - 1 ? prev + 1 : prev
    );
    setProgress(0);
  };

  const handlePrevious = () => {
    setCurrentStopIndex((prev) => (prev > 0 ? prev - 1 : prev));
    setProgress(0);
  };

  return (
    <TourPlayer
      currentStop={tourStops[currentStopIndex]}
      isPlaying={isPlaying}
      onPlayPause={() => setIsPlaying(!isPlaying)}
      onNext={handleNext}
      onPrevious={handlePrevious}
      progress={progress}
      onProgressChange={(newProgress) => {
        setProgress(newProgress);
      }}
    />
  );
}
