"use client";

import { useState, useRef, useEffect } from "react";
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

import { LocationData, ArtistData, artistData, artistImages } from "@/data";
import { getAudioUrl } from "@/lib/utils";

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
    (artist: ArtistData) =>
      Math.floor(parseFloat(artist.stop)) ===
      Math.floor(parseFloat(tourStop?.stop || "0"))
  );
  const audioUrl = getAudioUrl(tourStop?.stop);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showAR, setShowAR] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [hasPlayedAudio, setHasPlayedAudio] = useLocalStorage(
    `hasPlayed-${tourStop?.artTitle}`,
    false
  );
  const [savedTimestamp, setSavedTimestamp] = useLocalStorage(
    `audioTime-${tourStop?.stop}`,
    0
  );
  const [isStatementExpanded, setIsStatementExpanded] = useState(false);

  // Reset statement expansion when tour stop changes
  useEffect(() => {
    setIsStatementExpanded(false);
  }, [tourStop?.id]);

  // Load saved timestamp when audio is ready
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audioUrl) return;

    const loadSavedTime = () => {
      if (savedTimestamp > 0 && audio.duration) {
        audio.currentTime = savedTimestamp;
      }
    };

    audio.addEventListener("loadedmetadata", loadSavedTime);
    return () => {
      audio.removeEventListener("loadedmetadata", loadSavedTime);
    };
  }, [audioUrl, savedTimestamp]);

  // Handle play/pause
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlayingAudio) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlayingAudio]);

  // Update progress as audio plays and save timestamp
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      const progress = (audio.currentTime / audio.duration) * 100;
      setAudioProgress(progress || 0);
      setSavedTimestamp(audio.currentTime);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", () => {
      setIsPlayingAudio(false);
      setAudioProgress(0);
      setSavedTimestamp(0);
    });

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, [audioUrl, setSavedTimestamp]);

  // Handle seeking
  const handleSeek = (value: number) => {
    if (!audioRef.current) return;
    const time = (value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = time;
    setAudioProgress(value);
  };

  // Toggle play/pause
  const toggleAudio = () => {
    if (!hasPlayedAudio) setHasPlayedAudio(true);
    setIsPlayingAudio((p) => !p);
  };

  // Open maps with location
  const openMaps = () => {
    if (!tourStop?.coordinates) return;

    const [lng, lat] = tourStop.coordinates;

    // Detect iOS device
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    // Use platform-specific URL
    const mapsUrl = isIOS
      ? `http://maps.apple.com/?q=${lat},${lng}`
      : `https://maps.google.com/?q=${lat},${lng}`;

    window.open(mapsUrl, "_blank");
  };

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
      <DrawerContent className="bg-black/60 backdrop-blur-md border border-white/20 h-[63vh] flex flex-col overflow-hidden max-w-[480px] md:max-w-[640px] lg:max-w-[900px] mx-auto">
        <DrawerHeader className="text-left px-4 flex flex-col items-start flex-shrink-0">
          <div>
            <DrawerTitle className="text-white text-xl tracking-wide">
              {tourStop.artTitle}
            </DrawerTitle>
            {stopArtistData.length > 0 ? (
              <div className="mt-2 text-sm">
                {stopArtistData.map((artist: ArtistData, index) => (
                  <div
                    key={index}
                    className="text-gray-400"
                  >
                    {artist.credittitle.length > 0
                      ? artist.credittitle
                      : "Artist"}
                    :
                    <span className="text-white">
                      {artist.fullname || tourStop.artist}
                    </span>
                  </div>
                ))}
              </div>
            ) : tourStop.artist ? (
              <div className="mt-2 text-sm text-gray-400">
                Artist:
                <span className="text-white">{tourStop.artist}</span>
              </div>
            ) : null}
            <DrawerDescription className="text-gray-200 text-base mt-2 flex items-center gap-3">
              <span>{tourStop.locationDescription}</span>
              {tourStop.coordinates && tourStop.coordinates[0] !== 0 && (
                <button
                  onClick={openMaps}
                  className="text-white bg-route66Turquoise/80 hover:bg-route66Turquoise transition-all flex-shrink-0 rounded-md p-1 ml-1 -mt-0.5"
                  aria-label="Open in maps"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                </button>
              )}
            </DrawerDescription>
          </div>
        </DrawerHeader>
        <div className="flex items-center justify-start py-2 pl-4 flex-shrink-0">
          <button
            onClick={toggleAudio}
            disabled={!audioUrl}
            className="text-white bg-route66Turquoise hover:bg-route66Turquoise/80 rounded-full py-2 px-4 text-sm flex items-center whitespace-nowrap overflow-hidden"
            style={{
              width: isPlayingAudio ? 200 : 180,
              height: 40,
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
                style={{ pointerEvents: !isPlayingAudio ? "auto" : "none" }}
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
                style={{ pointerEvents: isPlayingAudio ? "auto" : "none" }}
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
                    onChange={(e) => handleSeek(Number(e.target.value))}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full h-1 accent-white/80 cursor-pointer transition-opacity duration-300"
                    aria-label="Audio progress"
                  />
                </div>
              </div>
            </div>
          </button>
          {tourStop.isAR && (
            <button
              disabled={!tourStop.arURL}
              onClick={() => {
                if (audioRef.current) {
                  audioRef.current.pause();
                  setIsPlayingAudio(false);
                }
                setShowAR(true);
              }}
              className={`text-white bg-white/20 hover:bg-white/30 rounded-full px-4 py-2 mx-2 text-sm font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center whitespace-nowrap ${
                tourStop.arURL ? "border-2 border-route66Turquoise" : ""
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
                  Artist Statement
                </h3>
                {(() => {
                  const totalStatementLength = stopArtistData.reduce(
                    (sum, artist) =>
                      sum + (artist.artiststatement?.length || 0),
                    0
                  );
                  const needsExpand = totalStatementLength > 400;

                  return needsExpand ? (
                    <div className="relative">
                      <div
                        className={`relative overflow-hidden transition-all duration-300 ${
                          isStatementExpanded ? "max-h-none" : "max-h-44"
                        }`}
                      >
                        {stopArtistData.map((artist: ArtistData, index) => (
                          <div
                            key={index}
                            className="mb-4"
                          >
                            <p className="whitespace-pre-line">
                              {artist.artiststatement}
                            </p>
                          </div>
                        ))}
                        {!isStatementExpanded && (
                          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent pointer-events-none" />
                        )}
                      </div>
                      <button
                        onClick={() =>
                          setIsStatementExpanded(!isStatementExpanded)
                        }
                        className="flex items-center justify-center gap-2 text-route66Turquoise transition-colors mt-3 relative z-10 w-full"
                      >
                        <span className="text-base font-semibold">
                          {isStatementExpanded ? "Show less" : "Read more"}
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`w-5 h-5 transition-transform duration-300 ${
                            isStatementExpanded ? "rotate-180" : ""
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div>
                      {stopArtistData.map((artist: ArtistData, index) => (
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
                  );
                })()}
              </div>

              {/* Artist Bios Section */}
              <div>
                <h3 className="text-white text-lg font-semibold mb-3">
                  {stopArtistData.length > 1 ? "Artist Bios" : "Artist Bio"}
                </h3>
                {stopArtistData.map((artist, index) => (
                  <div
                    key={index}
                    className="mb-6"
                  >
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-shrink-0">
                        {artistImages[artist.fullname || tourStop.artist] && (
                          <div className="mb-2">
                            <Image
                              src={
                                artistImages[artist.fullname || tourStop.artist]
                              }
                              alt={`${
                                artist.fullname || tourStop.artist
                              } portrait`}
                              width={150}
                              height={150}
                              className="rounded-lg shadow-lg object-cover w-[150px] h-auto"
                            />
                          </div>
                        )}
                        <h4 className="text-white text-base font-semibold mb-1">
                          {artist.fullname || tourStop.artist}
                        </h4>
                        {artist.pronouns && (
                          <p className="text-gray-400 text-sm mb-3">
                            {artist.pronouns}
                          </p>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="whitespace-pre-line mb-3">
                          {artist.artistbio}
                        </p>
                        {artist.links && artist.links.length > 0 && (
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
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : tourStop.artist ? (
            <div className="space-y-6">
              {/* Artist Bios Section - Fallback to locationData */}
              <div>
                <h3 className="text-white text-lg font-semibold mb-3">
                  Artist Bio
                </h3>
                <div className="mb-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-shrink-0">
                      {artistImages[tourStop.artist] && (
                        <div className="mb-2">
                          <Image
                            src={artistImages[tourStop.artist]}
                            alt={`${tourStop.artist} portrait`}
                            width={150}
                            height={150}
                            className="rounded-lg shadow-lg object-cover w-[150px] h-auto"
                          />
                        </div>
                      )}
                      <h4 className="text-white text-base font-semibold mb-1">
                        {tourStop.artist}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-400 italic">
              No artist information available for this stop.
            </p>
          )}
        </div>
      </DrawerContent>
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          preload="metadata"
        />
      )}
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
