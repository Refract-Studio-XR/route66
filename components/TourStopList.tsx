import { tourStops, TourStop } from "@/data/tourStops";
import TourStopListItem from "./TourStopListItem";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TourStopListProps {
  drawerOpen?: boolean;
  onSelectTourStop?: (stop: TourStop) => void;
}

const TourStopList: React.FC<TourStopListProps> = ({ onSelectTourStop }) => {
  return (
    <ScrollArea>
      {tourStops.map((stop) => (
        <TourStopListItem
          key={stop.id}
          location={stop.location}
          title={stop.title}
          artist={stop.artist}
          coverImage={stop.coverImage}
          onClick={() => onSelectTourStop && onSelectTourStop(stop)}
        />
      ))}
    </ScrollArea>
  );
};

export default TourStopList;
