import { useState } from "react";
import Image from "next/image";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { useLocalStorage } from "@uidotdev/usehooks";
import ARPlayer from "./ARPlayer";
import type { TourStop } from "@/data/tourStops";

interface TourStopDetailDrawerProps {
  tourStop: TourStop | null;
  open: boolean;
  onClose: () => void;
}

const TourStopDetailDrawer: React.FC<TourStopDetailDrawerProps> = ({
  tourStop,
  open,
  onClose,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showAR, setShowAR] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [hasPlayedAudio, setHasPlayedAudio] = useLocalStorage(
    `hasPlayed-${tourStop?.id}`,
    false
  );
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
            onClick={() => {
              setIsPlayingAudio(true);
            }}
            className="bg-blue-600 text-white rounded-full px-4 py-2 font-semibold shadow hover:bg-blue-700 transition"
            aria-label="Start AR"
          >
            Start AR
          </button>
          <button
            onClick={() => {
              if (!hasPlayedAudio) setHasPlayedAudio(true);
              setIsPlayingAudio((p) => !p);
            }}
            className={`bg-zinc-800 text-white rounded-full p-3 shadow hover:bg-zinc-700 transition-all duration-300 flex items-center gap-1`}
            style={{ minWidth: isPlayingAudio ? 48 : 140 }}
            aria-label={isPlayingAudio ? "Pause" : "Play"}
          >
            {(!hasPlayedAudio || !isPlayingAudio) && (
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
            {isPlayingAudio && (
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
                isPlayingAudio ? "opacity-0 w-0" : "opacity-100 w-auto"
              }`}
              style={{ display: isPlayingAudio ? "none" : "inline" }}
            >
              Play intro audio
            </span>
          </button>
          <input
            type="range"
            min={0}
            max={100}
            value={audioProgress}
            onChange={(e) => setAudioProgress(Number(e.target.value))}
            className={`w-1/4 h-2 accent-zinc-600 transition-all duration-500 ${
              hasPlayedAudio ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            aria-label="Audio progress"
          />
        </div>
        {(tourStop.coverImage || tourStop.artistImage) && (
          <div className="flex justify-start gap-4 p-4">
            {tourStop.coverImage && (
              <Image
                src={tourStop.coverImage}
                alt={tourStop.title}
                width={120}
                height={120}
                className="rounded-xl border border-zinc-700 object-cover"
                priority
              />
            )}
            {tourStop.artistImage && (
              <Image
                src={tourStop.artistImage}
                alt={tourStop.artist}
                width={120}
                height={120}
                className="rounded-xl border border-zinc-700 object-cover"
                priority
              />
            )}
          </div>
        )}
        <div className="text-gray-300 p-4 whitespace-pre-line min-h-[300px] max-h-[550px] overflow-y-auto">
          {tourStop.artistStatement}
        </div>
      </DrawerContent>
      {showAR && (
        <ARPlayer
          url={tourStop.arUrl}
          onClose={() => {
            setShowAR(false);
          }}
        />
      )}
    </Drawer>
  );
};

export default TourStopDetailDrawer;
