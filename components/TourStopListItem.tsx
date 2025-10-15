interface TourStopListItemProps {
  id: string;
  location: string;
  title: string;
  artist: string;
  isAR?: boolean;
  arURL?: string;
  onClick?: () => void;
}

const TourStopListItem: React.FC<TourStopListItemProps> = ({
  id,
  location,
  title,
  artist,
  isAR,
  arURL,
  onClick,
}) => {
  const isComingSoon = isAR && !arURL;
  return (
    <div
      className="flex flex-col bg-white/10 backdrop-blur-sm rounded-xl p-3 mb-3 shadow-lg border border-white/10 relative"
      onClick={isComingSoon ? undefined : onClick}
      style={{
        cursor: isComingSoon ? "default" : onClick ? "pointer" : undefined,
      }}
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
      {isComingSoon && (
        <div className="absolute inset-0 bg-black/75 backdrop-blur-md rounded-xl flex items-center justify-center">
          <span className="text-white text-xl font-semibold drop-shadow-lg">
            Coming Soon
          </span>
        </div>
      )}
    </div>
  );
};

export default TourStopListItem;
