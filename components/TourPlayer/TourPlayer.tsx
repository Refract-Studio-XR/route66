import Image from "next/image";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ChevronDown, Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { useState } from "react";

type TourStop = {
  id: string;
  title: string;
  artist: string;
  duration: number;
  coverImage: string;
  artistStatement: string;
  arExperienceUrl: string;
};

type TourPlayerProps = {
  currentStop: TourStop;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  isPlaying: boolean;
  progress: number;
  onProgressChange: (value: number) => void;
};

const TourPlayer = ({
  currentStop,
  onPlayPause,
  onNext,
  onPrevious,
  isPlaying,
  progress,
  onProgressChange,
}: TourPlayerProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="fixed inset-0 bg-[#635985] text-white">
      {/* Header */}
      <div className="p-4 flex items-center">
        <Button
          variant="ghost"
          className="text-white"
        >
          <ChevronDown className="h-6 w-6" />
        </Button>
        <div className="flex-1 text-center">
          <h1 className="text-lg font-medium">Crying in the club</h1>
        </div>
        <div className="w-10" /> {/* Spacer for symmetry */}
      </div>

      {/* Cover Art / AR Preview Area */}
      <div className="px-4 py-8">
        <div className="aspect-square relative rounded-lg overflow-hidden bg-[#4A4268] flex items-center justify-center">
          <Button
            variant="outline"
            className="bg-white/10 hover:bg-white/20 text-white border-white/20"
          >
            View AR Experience
          </Button>
        </div>
      </div>

      {/* Title and Artist */}
      <div className="px-4 text-center">
        <h2 className="text-2xl font-bold">{currentStop.title}</h2>
        <p className="text-sm text-white/70">{currentStop.artist}</p>
      </div>

      {/* Progress Bar */}
      <div className="px-4 py-6">
        <Slider
          value={[progress]}
          onValueChange={(values) => onProgressChange(values[0])}
          max={100}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-sm mt-1">
          <span>{formatTime(progress)}</span>
          <span>{formatTime(currentStop.duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-8 px-4 py-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={onPrevious}
          className="text-white"
        >
          <SkipBack className="h-8 w-8" />
        </Button>

        <Button
          size="icon"
          onClick={onPlayPause}
          className="h-16 w-16 rounded-full bg-white text-black hover:bg-white/90"
        >
          {isPlaying ? (
            <Pause className="h-8 w-8" />
          ) : (
            <Play className="h-8 w-8" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onNext}
          className="text-white"
        >
          <SkipForward className="h-8 w-8" />
        </Button>
      </div>

      {/* Mini Drawer Preview */}
      {!drawerOpen && (
        <div
          className="fixed bottom-0 inset-x-0 bg-white dark:bg-zinc-900 rounded-t-[10px] cursor-pointer"
          onClick={() => setDrawerOpen(true)}
        >
          <div className="mx-auto w-32 h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full mt-4" />
          <div className="p-4 relative">
            <div className="relative h-[3em] overflow-hidden">
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {currentStop.artistStatement}
              </p>
              <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-white dark:from-zinc-900 to-transparent" />
            </div>
          </div>
        </div>
      )}

      {/* Full Drawer */}
      <Drawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      >
        <DrawerContent className="fixed inset-x-0 bottom-0 mt-24 rounded-t-[10px] bg-white dark:bg-zinc-900">
          <DrawerHeader>
            {/* <DrawerTitle className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              {currentStop.title}
            </DrawerTitle>
            <DrawerDescription className="text-sm text-zinc-500 dark:text-zinc-400">
              by {currentStop.artist}
            </DrawerDescription> */}
          </DrawerHeader>
          <div className="px-4 pb-8">
            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {currentStop.artistStatement}
            </p>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

// Helper function for formatting time
const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

export default TourPlayer;
