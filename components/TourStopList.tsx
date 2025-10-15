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
        // Check if this location has artist statement data
        const hasArtistStatement = artistData.some(
          (artist) =>
            Math.floor(parseFloat(artist.stop)) ===
              Math.floor(parseFloat(location.stop)) &&
            artist.artiststatement &&
            artist.artiststatement.length > 0
        );

        return (
          <TourStopListItem
            key={location.id}
            id={location.id}
            location={location.locationDescription}
            title={location.artTitle}
            artist={location.artist}
            isAR={location.isAR}
            arURL={location.arURL}
            hasArtistStatement={hasArtistStatement}
            onClick={() => onSelectTourStop && onSelectTourStop(location)}
          />
        );
      })}
    </ScrollArea>
  );
};

export default TourStopList;
