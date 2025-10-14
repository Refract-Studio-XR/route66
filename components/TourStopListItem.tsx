interface TourStopListItemProps {
  location: string;
  title: string;
  artist: string;
  onClick?: () => void;
}

const TourStopListItem: React.FC<TourStopListItemProps> = ({
  location,
  title,
  artist,
  onClick,
}) => {
  return (
    <div
      className="flex flex-col bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4 shadow-lg border border-white/10"
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : undefined }}
    >
      <div className="flex gap-3">
        <div className="w-20 h-20 flex-shrink-0 bg-zinc-900 rounded-lg border border-white/20" />
        <div className="flex flex-col justify-center">
          <div className="font-bold text-white text-lg leading-tight drop-shadow-lg">
            {title}
          </div>
          <div className="text-gray-200 text-base drop-shadow-md">
            {location}
          </div>
          <div className="text-gray-300 text-sm mt-1 drop-shadow-sm">
            {artist}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourStopListItem;
