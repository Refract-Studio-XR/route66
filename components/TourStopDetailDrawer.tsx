"use client";

import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { useLocalStorage } from "usehooks-ts";
import ARPlayer from "./ARPlayer";

import { LocationData, ArtistData, artistData } from "@/data";

interface TourStopDetailDrawerProps {
  tourStop: LocationData | null;
  open: boolean;
  onClose: () => void;
}

const TourStopDetailDrawer: React.FC<TourStopDetailDrawerProps> = ({
  tourStop,
  open,
  onClose,
}) => {
  const stopArtistData = artistData.filter(
    (artist: ArtistData) => artist.stop === tourStop?.stop
  );
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showAR, setShowAR] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [hasPlayedAudio, setHasPlayedAudio] = useLocalStorage(
    `hasPlayed-${tourStop?.artTitle}`,
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
      <DrawerContent className="bg-black/60 backdrop-blur-md border border-white/20 h-[70vh] flex flex-col overflow-hidden max-w-[480px] md:max-w-[640px] lg:max-w-[900px] mx-auto">
        <DrawerHeader className="text-left px-4 flex flex-col items-start flex-shrink-0">
          <div>
            <DrawerTitle className="text-white text-xl tracking-wide">
              {tourStop.artTitle}
            </DrawerTitle>
            {stopArtistData.length > 0 && (
              <div className="mt-2 text-sm">
                {stopArtistData.map((artist: ArtistData, index) => (
                  <div
                    key={index}
                    className="text-gray-400"
                  >
                    {artist.credittitle}:{" "}
                    <span className="text-white">{artist.fullname}</span>
                  </div>
                ))}
              </div>
            )}
            <DrawerDescription className="text-gray-200 text-base mt-2">
              {tourStop.locationDescription}
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
              width: isPlayingAudio ? 200 : 180,
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
                <span>Listen to intro poem</span>
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
          {tourStop.isAR && (
            <button
              disabled={!hasPlayedAudio || !tourStop.arURL}
              onClick={() => {
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
              {!tourStop.arURL ? "AR Coming Soon" : "Start AR"}
            </button>
          )}
        </div>
        <div className="flex-1 overflow-y-auto p-4 pb-8 text-gray-300 min-h-0">
          {stopArtistData.length > 0 ? (
            <div className="space-y-6">
              {/* Artist Statements Section */}
              <div>
                <h3 className="text-white text-lg font-semibold mb-3">
                  {stopArtistData.length > 1
                    ? "Artist Statements"
                    : "Artist Statement"}
                </h3>
                {stopArtistData.map((artist, index) => (
                  <div
                    key={index}
                    className="mb-4"
                  >
                    <p className="whitespace-pre-line">
                      {artist.artiststatement}
                    </p>
                  </div>
                ))}
              </div>

              {/* Artist Bios Section */}
              <div>
                <h3 className="text-white text-lg font-semibold mb-3">
                  {stopArtistData.length > 1 ? "Artist Bios" : "Artist Bio"}
                </h3>
                {stopArtistData.map((artist, index) => (
                  <div
                    key={index}
                    className="mb-4"
                  >
                    {stopArtistData.length > 1 && (
                      <h4 className="text-white text-base font-medium mb-2">
                        {artist.fullname}
                      </h4>
                    )}
                    <p className="whitespace-pre-line">{artist.artistbio}</p>
                  </div>
                ))}
              </div>

              {/* Links Section */}
              {stopArtistData.some(
                (artist: ArtistData) => artist.links && artist.links.length > 0
              ) && (
                <div>
                  <h3 className="text-white text-lg font-semibold mb-3">
                    {stopArtistData.length > 1
                      ? "Artist Links"
                      : "Artist Links"}
                  </h3>
                  {stopArtistData.map(
                    (artist: ArtistData) =>
                      artist.links &&
                      artist.links.length > 0 && (
                        <div
                          key={artist.fullname}
                          className="mb-4"
                        >
                          {stopArtistData.length > 1 && (
                            <h4 className="text-white text-base font-medium mb-2">
                              {artist.fullname}
                            </h4>
                          )}
                          <div className="space-y-2">
                            {artist.links.map((link, linkIndex) => (
                              <a
                                key={linkIndex}
                                href={
                                  link.startsWith("http")
                                    ? link
                                    : `https://${link}`
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-route66Turquoise hover:text-white underline transition-colors"
                              >
                                {link}
                              </a>
                            ))}
                          </div>
                        </div>
                      )
                  )}
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-400 italic">
              No artist information available for this stop.
            </p>
          )}
        </div>
      </DrawerContent>
      {showAR && tourStop.arURL && (
        <ARPlayer
          url={tourStop.arURL}
          onClose={() => {
            setShowAR(false);
          }}
        />
      )}
    </Drawer>
  );
};

export default TourStopDetailDrawer;
