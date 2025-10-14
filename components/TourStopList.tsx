import { locationData, LocationData } from "@/data/";
import TourStopListItem from "./TourStopListItem";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TourStopListProps {
  onSelectTourStop?: (stop: LocationData) => void;
}

const TourStopList: React.FC<TourStopListProps> = ({ onSelectTourStop }) => {
  return (
    <ScrollArea>
      {locationData.map((location: LocationData) => (
        <TourStopListItem
          key={location.id}
          location={location.locationDescription}
          title={location.artTitle}
          artist={location.artist}
          onClick={() => onSelectTourStop && onSelectTourStop(location)}
        />
      ))}
    </ScrollArea>
  );
};

export default TourStopList;
