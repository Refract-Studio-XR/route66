"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { tourStops, TourStop } from "@/data/tourStops";
import TourPlayer from "@/components/TourPlayer";

export default function TourStopPage() {
  const params = useParams();
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStop, setCurrentStop] = useState<TourStop | null>(null);

  useEffect(() => {
    if (params.id) {
      const stopId = parseInt(params.id as string);
      const stop = tourStops.find((s) => s.id === stopId);

      if (stop) {
        setCurrentStop(stop);
      } else {
        // Redirect to tour list if stop not found
        router.push("/tour");
      }
    }
  }, [params.id, router]);

  const handleNext = () => {
    if (currentStop) {
      const currentIndex = tourStops.findIndex((s) => s.id === currentStop.id);
      if (currentIndex < tourStops.length - 1) {
        router.push(`/tour/${tourStops[currentIndex + 1].id}`);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStop) {
      const currentIndex = tourStops.findIndex((s) => s.id === currentStop.id);
      if (currentIndex > 0) {
        router.push(`/tour/${tourStops[currentIndex - 1].id}`);
      }
    }
  };

  const handleProgressChange = (newProgress: number) => {
    setProgress(newProgress);
  };

  if (!currentStop) {
    return <div className="container mx-auto p-8">Loading...</div>;
  }

  return (
    <div>
      <TourPlayer
        currentStop={currentStop}
        isPlaying={isPlaying}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onNext={handleNext}
        onPrevious={handlePrevious}
        progress={progress}
        onProgressChange={handleProgressChange}
      />
      <div className="container mx-auto p-4 mt-4">
        <button
          onClick={() => router.push("/tour")}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Back to Tour List
        </button>
      </div>
    </div>
  );
}
