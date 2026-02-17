import { locationData, LocationData, artistData } from "@/data/";
import TourStopListItem from "./TourStopListItem";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TourStopListProps {
  onSelectTourStop?: (stop: LocationData) => void;
}

const TourStopList: React.FC<TourStopListProps> = ({ onSelectTourStop }) => {
  const sortedLocations = [...locationData].sort((a, b) => {
    return parseFloat(a.stop) - parseFloat(b.stop);
  });

  return (
    <ScrollArea>
      {sortedLocations.map((location: LocationData) => {
        return (
          <TourStopListItem
            key={location.id}
            id={location.id}
            location={location.locationDescription}
            title={location.artTitle}
            artist={location.artist}
            isAR={location.isAR}
            arURL={location.arURL}
            coverImage={location.coverImage}
            coverImagePosition={location.coverImagePosition}
            onClick={() => onSelectTourStop && onSelectTourStop(location)}
          />
        );
      })}
    </ScrollArea>
  );
};

export default TourStopList;
