import React from "react";
import { tourStops } from "@/data/tourStops";
import TourStopListItem from "./TourStopListItem";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TourStopListProps {
  drawerOpen?: boolean;
}

const TourStopList: React.FC<TourStopListProps> = () => {
  return (
    <ScrollArea>
      {tourStops.map((stop) => (
        <TourStopListItem
          key={stop.id}
          location={stop.location}
          title={stop.title}
          artist={stop.artist}
          coverImage={stop.coverImage}
        />
      ))}
      {tourStops.map((stop) => (
        <TourStopListItem
          key={stop.id}
          location={stop.location}
          title={stop.title}
          artist={stop.artist}
          coverImage={stop.coverImage}
        />
      ))}
    </ScrollArea>
  );
};

export default TourStopList;
