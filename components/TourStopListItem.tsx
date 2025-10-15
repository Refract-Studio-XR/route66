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
      className="flex flex-col bg-white/10 backdrop-blur-sm rounded-xl p-3 mb-3 shadow-lg border border-white/10"
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : undefined }}
    >
      <div className="flex gap-2.5">
        <div className="w-16 h-16 flex-shrink-0 bg-zinc-900 rounded-lg border border-white/20" />
        <div className="flex flex-col justify-center">
          <div className="font-bold text-white text-base leading-tight drop-shadow-lg">
            {title}
          </div>
          <div className="text-gray-300 text-sm mt-0.5 drop-shadow-sm">
            {artist}
          </div>
          <div className="text-gray-200 text-xs mt-0.5 drop-shadow-md">
            {location}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourStopListItem;
