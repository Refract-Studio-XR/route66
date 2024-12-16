import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  PlayCircle,
  PauseCircle,
  SkipBack,
  SkipForward,
  ChevronDown,
} from "lucide-react";
import ARPreviewSlider from "./ARPreviewSlider";
import * as Slider from "@radix-ui/react-slider";

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
    <div className="fixed inset-0 h-[100dvh] bg-[#635985] text-white flex flex-col">
      {/* Header */}
      <div className="p-1 pt-[2dvh] flex items-center">
        <Button
          variant="ghost"
          className="text-white"
        >
          <ChevronDown className="h-6 w-6" />
        </Button>
        <div className="flex-1 text-center">
          <h1 className="text-lg font-medium">Route 66 AR</h1>
        </div>
        <div className="w-10" />
      </div>

      {/* Main content */}
      <div className="flex flex-col">
        {/* Caro area */}
        <ARPreviewSlider />

        {/* Title area */}
        <div className="px-1 pt-2 text-center h-24 flex flex-col justify-center">
          <h2 className="text-3xl font-bold leading-tight">
            {currentStop.title}
          </h2>
          <p className="text-base text-white/70 mt-1">{currentStop.artist}</p>
        </div>

        {/* Progress bar */}
        <div className="px-6 py-4">
          <Slider.Root
            className="relative flex items-center select-none touch-none w-full"
            defaultValue={[0]}
            value={[progress]}
            max={100}
            step={1}
            onValueChange={(value) => onProgressChange(value[0])}
          >
            <Slider.Track className="bg-white/20 relative grow rounded-full h-1">
              <Slider.Range className="absolute bg-white rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb className="hidden" />
          </Slider.Root>
        </div>

        {/* Controls with subtle press states */}
        <div className="flex justify-center items-center gap-8 px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onPrevious}
            className="active:bg-white/10 hover:bg-transparent"
          >
            <SkipBack
              fill="white"
              color="white"
            />
          </Button>

          <Button
            onClick={onPlayPause}
            className="rounded-full bg-white text-black hover:bg-white active:scale-95 transition-transform h-16 w-16"
          >
            {isPlaying ? <PauseCircle /> : <PlayCircle />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={onNext}
            className="active:bg-white/10 hover:bg-transparent"
          >
            <SkipForward
              fill="white"
              color="white"
            />
          </Button>
        </div>
      </div>

      {/* Drawer content with dvh */}
      <Drawer
        open={true}
        snapPoints={[0.5, 0.6, 0.7, 0.8, 0.9, 1]}
        activeSnapPoint={0.5}
      >
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{currentStop.title}</DrawerTitle>
            <DrawerDescription>by {currentStop.artist}</DrawerDescription>
          </DrawerHeader>
          <div className="px-4 pb-8  relative">
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {currentStop.artistStatement}
            </p>
            <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-white dark:from-zinc-900 to-transparent" />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default TourPlayer;
