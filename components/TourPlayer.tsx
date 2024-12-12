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
  ChevronDown,
  PlayCircle,
  PauseCircle,
  SkipBack,
  SkipForward,
} from "lucide-react";
import ARPreviewSlider from "./ARPreviewSlider";

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
}: TourPlayerProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const slides = [
    { id: "1", title: "AR Experience 1" },
    { id: "2", title: "AR Experience 2" },
    { id: "3", title: "AR Experience 3" },
  ];

  return (
    <div className="fixed inset-0 bg-[#635985] text-white">
      {/* Header - increased padding and text size */}
      <div className="p-6 pt-10 flex items-center">
        <div className="flex-1 text-center">
          <h1 className="text-xl font-medium">Crying in the club</h1>
        </div>
        <div className="w-12" />
      </div>

      {/* Slider area - increased padding in ARPreviewSlider */}
      <div className="flex-1">
        <ARPreviewSlider slides={slides} />
      </div>

      {/* Title and Artist - increased text sizes */}
      <div className="px-6 text-center">
        <h2 className="text-3xl font-bold">{currentStop.title}</h2>
        <p className="text-base text-white/70 mt-2">{currentStop.artist}</p>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-12 px-6 py-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={onPrevious}
          className="text-white"
        >
          <SkipBack className="h-12 w-12 fill-current" />
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={onPlayPause}
          className="rounded-full bg-white text-black hover:bg-white/90 h-16 w-16"
        >
          {isPlaying ? <PauseCircle /> : <PlayCircle />}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onNext}
          className="text-white"
        >
          <SkipForward className="h-12 w-12 fill-current" />
        </Button>
      </div>

      {/* Full Drawer */}
      <Drawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      >
        <DrawerContent className="fixed inset-x-0 bottom-0 mt-24 rounded-t-[10px] bg-white dark:bg-zinc-900">
          <DrawerHeader>
            <DrawerTitle className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              {currentStop.title}
            </DrawerTitle>
            <DrawerDescription className="text-sm text-zinc-500 dark:text-zinc-400">
              by {currentStop.artist}
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4 pb-8">
            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
              {currentStop.artistStatement}
            </p>
          </div>
        </DrawerContent>
      </Drawer>

      {/* Mini Drawer Preview */}
      {!drawerOpen && (
        <div
          className="fixed bottom-0 inset-x-0 bg-white dark:bg-zinc-900 rounded-t-[10px] cursor-pointer"
          onClick={() => setDrawerOpen(true)}
        >
          <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
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
    </div>
  );
};

export default TourPlayer;
