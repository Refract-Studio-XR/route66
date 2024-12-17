import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import {
  PlayCircle,
  PauseCircle,
  SkipBack,
  SkipForward,
  ChevronDown,
} from "lucide-react";
import { DrawerClose } from "@/components/ui/drawer";
import { X } from "lucide-react";
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

const SNAP_POINTS = [0.2, `${window.innerHeight * 0.9}px`];

const TourPlayer = ({
  currentStop,
  onPlayPause,
  onNext,
  onPrevious,
  isPlaying,
  progress,
  onProgressChange,
}: TourPlayerProps) => {
  const [snap, setSnap] = useState<number | string | null>(SNAP_POINTS[0]);

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
        <div
          className="flex justify-center items-center gap-8 px-4"
          style={{ position: "relative", zIndex: 2 }}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              onPrevious();
              setSnap(SNAP_POINTS[0]);
            }}
            className="text-white active:bg-white/10 hover:bg-transparent"
          >
            <SkipBack className="h-8 w-8 fill-current" />
          </Button>

          <Button
            size="icon"
            onClick={onPlayPause}
            className="rounded-full bg-white text-black hover:bg-white active:scale-95 transition-transform h-16 w-16"
          >
            {isPlaying ? (
              <PauseCircle className="h-10 w-10 stroke-2" />
            ) : (
              <PlayCircle className="h-10 w-10 stroke-2" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              onNext();
              setSnap(SNAP_POINTS[0]);
            }}
            className="text-white active:bg-white/10 hover:bg-transparent"
          >
            <SkipForward className="h-8 w-8 fill-current" />
          </Button>
        </div>
      </div>

      {/* Drawer content with dvh */}
      <Drawer
        modal={false}
        open
        snapPoints={SNAP_POINTS}
        onOpenChange={(open) => {
          setSnap(open ? SNAP_POINTS[0] : SNAP_POINTS[1]);
        }}
        activeSnapPoint={snap}
      >
        <DrawerHeader>
          {/* <DrawerTitle>{currentStop.title}</DrawerTitle>
            <DrawerDescription>by {currentStop.artist}</DrawerDescription> */}
        </DrawerHeader>
        <DrawerContent className="max-w-[540px] h-[700px] mx-auto">
          <div className="px-4 pb-8 pt-4 relative">
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {currentStop.artistStatement}
            </p>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default TourPlayer;
