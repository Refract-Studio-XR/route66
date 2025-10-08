import Image from "next/image";

interface TourStopListItemProps {
  location: string;
  title: string;
  artist: string;
  coverImage?: string;
  onClick?: () => void;
}

const TourStopListItem: React.FC<TourStopListItemProps> = ({
  location,
  title,
  artist,
  coverImage,
  onClick,
}) => {
  return (
    <div
      className="flex flex-col bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4 shadow-lg border border-white/10"
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : undefined }}
    >
      <div className="flex gap-3">
        <Image
          priority={true}
          height={100}
          width={100}
          src={coverImage || "/stub.jpg"}
          alt={title}
          className="w-20 h-20 object-cover rounded-lg border border-white/20 bg-zinc-700"
        />
        <div className="flex flex-col justify-center">
          <div className="font-bold text-white text-lg leading-tight drop-shadow-lg">
            {location}
          </div>
          <div className="text-gray-200 text-base drop-shadow-md">{title}</div>
          <div className="text-gray-300 text-sm mt-1 drop-shadow-sm">
            {artist}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourStopListItem;
