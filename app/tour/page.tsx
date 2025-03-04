"use client";

import { tourStops } from "@/data/tourStops";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Play } from "lucide-react";

export default function TourStopList() {
  // Get the first tour stop for the hero section
  const featuredStop = tourStops[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-900 via-red-990 to-black text-white">
      <div className="container mx-auto px-3 py-8">
        {/* Hero section - Spotify-style with image above text */}
        <div className="mb-4 p-2">
          <div className="flex flex-col items-center md:items-start md:flex-row md:gap-6">
            <div className="w-48 h-48 md:w-48 md:h-48 flex-shrink-0 shadow-lg mb-4 md:mb-0">
              <AspectRatio
                ratio={1}
                className="bg-muted"
              >
                {featuredStop.coverImage && (
                  <Image
                    src={featuredStop.coverImage}
                    alt="Featured Tour"
                    fill
                    className="object-cover rounded-md"
                  />
                )}
              </AspectRatio>
            </div>
            <div className="flex flex-col text-center md:text-left">
              <span className="text-xs font-medium uppercase mb-1 text-gray-300">
                Playlist
              </span>
              <h1 className="text-2xl md:text-4xl font-bold mb-1">
                Route 66 Tour
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start items-center text-xs text-gray-400">
                <span className="mr-1">Made for you by</span>
                <span className="font-semibold text-gray-200">
                  Albuquerque Arts & Culture
                </span>
              </div>
              <div className="flex justify-center md:justify-start text-xs text-gray-400 mt-1">
                <span>{tourStops.length} experiences</span>
                <span className="mx-1">•</span>
                <span>{Math.round((tourStops.length * 30) / 60)} hrs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tour list - more compact for mobile */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold">Experiences</h2>
          </div>
          <div className="rounded-lg overflow-hidden">
            {/* List items */}
            {tourStops.map((stop) => (
              <Link
                key={stop.id}
                href={`/tour/${stop.slug}`}
                className="block"
              >
                <div className="flex items-center bg-white/5 rounded-md p-3 hover:bg-white/10 transition-colors">
                  <div className="w-20 h-20 flex-shrink-0 mr-4">
                    <AspectRatio
                      ratio={1}
                      className="bg-muted rounded-md overflow-hidden"
                    >
                      {stop.coverImage && (
                        <Image
                          src={stop.coverImage}
                          alt={stop.title}
                          fill
                          className="object-cover"
                        />
                      )}
                    </AspectRatio>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-semibold truncate">
                      {stop.title}
                    </h2>
                    <p className="text-sm text-gray-300 truncate">
                      {stop.artist}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {stop.location}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Spotify-like fixed player at bottom - smaller for mobile */}
      <div className="fixed bottom-0 left-0 right-0 h-14 md:h-16 bg-zinc-900/90 backdrop-blur-sm border-t border-zinc-800 flex items-center px-3">
        <div className="w-full max-w-screen-xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-2 bg-zinc-800">
              <AvatarImage src={featuredStop.coverImage} />
              <AvatarFallback>RT</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-white text-sm font-medium">
                Select an experience
              </p>
              <p className="text-gray-400 text-xs">Start your journey</p>
            </div>
          </div>
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  size="sm"
                  className="rounded-full bg-green-500 hover:bg-green-600 h-8 w-8"
                >
                  <Play className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="bottom"
                className="bg-zinc-900 text-white border-zinc-800"
              >
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-3">Now Playing</h3>
                  <div className="flex items-center">
                    <Avatar className="h-12 w-12 mr-3">
                      <AvatarImage src={featuredStop.coverImage} />
                      <AvatarFallback>RT</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">Route 66 Tour</p>
                      <p className="text-gray-400 text-xs">
                        Albuquerque Arts & Culture
                      </p>
                    </div>
                  </div>
                  <Separator className="my-4 bg-zinc-800" />
                  <div className="flex justify-center">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full border-zinc-700 text-white text-xs"
                    >
                      View All Experiences
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
}
