"use client";

import { useState, useRef, useEffect } from "react";
import { TourStop } from "@/data/tourStops";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import ARPreviewSlider from "./ARPreviewSlider";
import Link from "next/link";
import * as Slider from "@radix-ui/react-slider";

interface TourStopClientProps {
  stop: TourStop;
}

export default function TourStopClient({ stop }: TourStopClientProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio(stop.audioUrl || "/audio/sample.mp3");
    audioRef.current = audio;

    // Set up event listeners
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
    });
    audio.addEventListener("ended", () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    });

    // Set initial volume
    audio.volume = 0.7;

    // Clean up
    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", () => {});
      audio.removeEventListener("ended", () => {});
    };
  }, [stop.audioUrl]);

  // Update progress bar
  const updateProgress = () => {
    if (audioRef.current) {
      const duration = audioRef.current.duration;
      const currentTime = audioRef.current.currentTime;
      setCurrentTime(currentTime);
      setProgress((currentTime / duration) * 100);
    }
  };

  // Toggle play/pause
  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle seeking
  const handleProgressChange = (value: number) => {
    if (audioRef.current) {
      const duration = audioRef.current.duration;
      audioRef.current.currentTime = (value / 100) * duration;
      setCurrentTime((value / 100) * duration);
      setProgress(value);
    }
  };

  // Format time (seconds to MM:SS)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Format remaining time with negative sign
  const formatRemainingTime = (currentTime: number, duration: number) => {
    const remaining = duration - currentTime;
    return `-${formatTime(remaining)}`;
  };

  return (
    <div className="safari-fix bg-gradient-to-b from-red-900 via-red-950 to-black text-white">
      {/* Header */}
      <div className="p-2 mt-8 flex items-center safe-top">
        <Link href="/tour">
          <Button
            variant="ghost"
            className="text-white p-1"
            size="lg"
          >
            <ChevronDown
              size={36}
              strokeWidth={2.5}
            />
          </Button>
        </Link>
        <div className="flex-1 text-center">
          <h1 className="text-lg font-medium">{stop.title}</h1>
        </div>
        <div className="w-8" />
      </div>

      {/* Main content */}
      <div className="flex flex-col">
        {/* AR Preview area (replacing hero image) */}
        <div className="px-3 py-6">
          <div className="rounded-md overflow-hidden">
            <ARPreviewSlider />
          </div>
        </div>

        {/* Track info */}
        <div className="px-3">
          <h2 className="text-xl font-bold">{stop.title}</h2>
          <p className="text-sm text-white/70">{stop.artist}</p>
        </div>

        {/* Progress bar */}
        <div className="px-3 mt-5">
          <div className="mb-1">
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-1"
              defaultValue={[0]}
              value={[progress]}
              max={100}
              step={0.1}
              onValueChange={(value) => handleProgressChange(value[0])}
            >
              <Slider.Track className="bg-white/20 relative grow rounded-full h-1">
                <Slider.Range className="absolute bg-white rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb className="block h-3 w-3 bg-white rounded-full focus:outline-none" />
            </Slider.Root>
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>{formatTime(currentTime)}</span>
            <span>{formatRemainingTime(currentTime, duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-8 px-3 py-4">
          <button
            className="text-white opacity-80 focus:outline-none active:opacity-100 touch-manipulation p-2"
            aria-label="Previous track"
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 5L9 12L19 19V5Z"
                fill="currentColor"
              />
              <rect
                x="7"
                y="5"
                width="2"
                height="14"
                fill="currentColor"
              />
            </svg>
          </button>

          <button
            onClick={handlePlayPause}
            className="bg-white rounded-full w-18 h-18 flex items-center justify-center focus:outline-none active:bg-gray-100 touch-manipulation"
            aria-label={isPlaying ? "Pause" : "Play"}
            style={{ width: "4.5rem", height: "4.5rem" }}
          >
            {isPlaying ? (
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="6"
                  y="4"
                  width="4"
                  height="16"
                  rx="1"
                  fill="black"
                />
                <rect
                  x="14"
                  y="4"
                  width="4"
                  height="16"
                  rx="1"
                  fill="black"
                />
              </svg>
            ) : (
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 5V19L19 12L8 5Z"
                  fill="black"
                />
              </svg>
            )}
          </button>

          <button
            className="text-white opacity-80 focus:outline-none active:opacity-100 touch-manipulation p-2"
            aria-label="Next track"
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 5L15 12L5 19V5Z"
                fill="currentColor"
              />
              <rect
                x="15"
                y="5"
                width="2"
                height="14"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>

        {/* Artist Statement Section */}
        <div className="mt-6 bg-black/30 p-3 rounded-t-3xl safe-bottom">
          <div className="flex justify-center mb-3">
            <div className="w-10 h-1 bg-white/30 rounded-full" />
          </div>
          <h3 className="text-lg font-bold mb-3 text-center">
            Artist Statement
          </h3>
          <p className="text-white/80 text-sm leading-relaxed">
            {stop.artistStatement || "No artist statement available."}
          </p>
        </div>
      </div>
    </div>
  );
}
