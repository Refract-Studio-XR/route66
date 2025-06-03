import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";

interface TourStopDetailDrawerProps {
  tourStop: {
    location: string;
    title: string;
    artist: string;
    artistStatement: string;
  } | null;
  open: boolean;
  onClose: () => void;
}

const TourStopDetailDrawer: React.FC<TourStopDetailDrawerProps> = ({
  tourStop,
  open,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasPlayed, setHasPlayed] = useState(false);
  if (!tourStop) return null;

  return (
    <Drawer
      open={open}
      onOpenChange={(v) => {
        if (!v) onClose();
      }}
      dismissible
    >
      <DrawerContent className="flex flex-col rounded-t-2xl bg-zinc-900 border border-zinc-800 border-b-0 z-50 shadow-lg outline-none ">
        <DrawerHeader className="text-left p-4 flex items-center justify-between">
          <div>
            <DrawerTitle className="text-white text-xl">
              {tourStop.title}
            </DrawerTitle>
            <DrawerDescription className="text-gray-400 text-base">
              {tourStop.location} — {tourStop.artist}
            </DrawerDescription>
          </div>
        </DrawerHeader>
        <div className="flex items-center justify-start py-2 px-4 gap-4">
          <button
            className="bg-blue-600 text-white rounded-full px-4 py-2 font-semibold shadow hover:bg-blue-700 transition"
            aria-label="Start AR"
          >
            Start AR
          </button>
          <button
            onClick={() => {
              setIsPlaying((p) => !p);
              if (!hasPlayed) setHasPlayed(true);
            }}
            className={`bg-zinc-800 text-white rounded-full p-3 shadow hover:bg-zinc-700 transition-all duration-300 flex items-center gap-1`}
            style={{ minWidth: hasPlayed ? 48 : 140 }}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {(!hasPlayed || !isPlaying) && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <polygon
                  points="6,4 20,12 6,20"
                  fill="currentColor"
                />
              </svg>
            )}
            {isPlaying && hasPlayed && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <rect
                  x="6"
                  y="5"
                  width="4"
                  height="14"
                  rx="1"
                  fill="currentColor"
                />
                <rect
                  x="14"
                  y="5"
                  width="4"
                  height="14"
                  rx="1"
                  fill="currentColor"
                />
              </svg>
            )}
            <span
              className={`ml-1 text-xs transition-all duration-300 ${
                hasPlayed ? "opacity-0 w-0" : "opacity-100 w-auto"
              }`}
              style={{ display: hasPlayed ? "none" : "inline" }}
            >
              Play intro audio
            </span>
          </button>
          <input
            type="range"
            min={0}
            max={100}
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            className={`w-1/4 h-2 accent-zinc-600 transition-all duration-300 ${
              hasPlayed ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            aria-label="Audio progress"
          />
        </div>
        <div className="text-gray-300 p-4 whitespace-pre-line min-h-[300px]">
          {tourStop.artistStatement}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default TourStopDetailDrawer;
