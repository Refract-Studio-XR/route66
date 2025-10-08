"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { useLocalStorage } from "usehooks-ts";
import ARPlayer from "./ARPlayer";
import type { TourStop } from "@/data/artourstops";

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
    `hasPlayed-${tourStop?.title}`,
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
      modal={false}
    >
      <DrawerContent className="bg-black/60 backdrop-blur-md border border-white/20 h-[70vh] flex flex-col overflow-hidden">
        <DrawerHeader className="text-left px-4 flex flex-col items-start flex-shrink-0">
          <div>
            <DrawerTitle className="text-white text-xl">
              {tourStop.title}
            </DrawerTitle>
            <DrawerDescription className="text-gray-200 text-base mt-2">
              {tourStop.location} — {tourStop.artist}
            </DrawerDescription>
          </div>
        </DrawerHeader>
        <div className="flex items-center justify-start py-2 pl-4 flex-shrink-0">
          <button
            onClick={() => {
              if (!hasPlayedAudio) setHasPlayedAudio(true);
              setIsPlayingAudio((p) => !p);
            }}
            className="text-white bg-route66Turquoise hover:bg-route66Turquoise/80 rounded-full py-2 px-4 text-sm flex items-center whitespace-nowrap overflow-hidden"
            style={{
              width: isPlayingAudio ? 200 : 150,
              transition:
                "width 500ms cubic-bezier(0.4, 0, 0.2, 1), background-color 300ms",
            }}
            aria-label={isPlayingAudio ? "Pause" : "Play"}
          >
            <div className="relative flex items-center justify-center w-full">
              <div
                className={`flex items-center gap-2 transition-all duration-500 ${
                  !isPlayingAudio
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-4 absolute"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <polygon
                    points="6,4 20,12 6,20"
                    fill="currentColor"
                  />
                </svg>
                <span>Listen to intro</span>
              </div>
              <div
                className={`flex items-center gap-2 w-full transition-all duration-500 ${
                  isPlayingAudio
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-4 absolute"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 flex-shrink-0"
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
                <div className="flex-1 min-w-0 px-1">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={audioProgress}
                    onChange={(e) => setAudioProgress(Number(e.target.value))}
                    className="w-full h-1 accent-white/80 cursor-pointer transition-opacity duration-300"
                    aria-label="Audio progress"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
            </div>
          </button>
          {tourStop.arUrl && (
            <button
              disabled={!hasPlayedAudio}
              onClick={() => {
                if (!tourStop.visible) return;
                setShowAR(true);
              }}
              className={`text-white bg-white/20 hover:bg-white/30 rounded-full px-4 py-2 mx-2 text-sm font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center whitespace-nowrap ${
                !hasPlayedAudio ? "" : "border-2 border-route66Turquoise"
              }`}
              style={{
                minWidth: 100,
              }}
              aria-label="Start AR"
            >
              Start AR
            </button>
          )}
        </div>
        <div className="flex-1 overflow-y-auto p-4 pb-8 text-gray-300 whitespace-pre-line min-h-0">
          {(tourStop.coverImage || tourStop.artistImage) && (
            <div className="flex justify-start gap-4 mb-4">
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
          {tourStop.artistStatement}
        </div>
      </DrawerContent>
      {showAR && tourStop.arUrl && (
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
