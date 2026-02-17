import Image from "next/image";
import { artistSquareImages } from "@/data";

interface TourStopListItemProps {
  id: string;
  location: string;
  title: string;
  artist: string;
  isAR?: boolean;
  arURL?: string;
  coverImage?: string;
  onClick?: () => void;
}

const TourStopListItem: React.FC<TourStopListItemProps> = ({
  id,
  location,
  title,
  artist,
  isAR,
  arURL,
  coverImage,
  onClick,
}) => {
  const isComingSoon = isAR && !arURL;
  const squareImage = artistSquareImages[artist];
  const displayImage = coverImage || squareImage;

  return (
    <div
      className="flex flex-col bg-white/10 backdrop-blur-sm rounded-xl p-2.5 mb-2.5 shadow-lg border border-white/10 relative"
      onClick={isComingSoon ? undefined : onClick}
      style={{
        cursor: isComingSoon ? "default" : onClick ? "pointer" : undefined,
      }}
    >
      <div className="flex gap-2.5 items-center">
        {displayImage ? (
          <Image
            src={displayImage}
            alt={coverImage ? title : artist}
            width={64}
            height={64}
            priority
            className="w-14 h-14 flex-shrink-0 rounded-lg object-cover border border-white/20"
          />
        ) : (
          <div className="w-14 h-14 flex-shrink-0 bg-zinc-900 rounded-lg border border-white/20" />
        )}
        <div className="flex flex-col justify-center flex-1">
          <div className="font-bold text-white text-sm leading-tight drop-shadow-lg">
            {title}
          </div>
          <div className="text-gray-300 text-xs mt-0.5 drop-shadow-sm">
            {artist}
          </div>
          <div className="text-gray-200 text-[11px] mt-0.5 drop-shadow-md">
            {location}
          </div>
        </div>
        {isAR && (
          <Image
            src="/ar-icon.svg"
            alt="AR Experience Available"
            width={40}
            height={40}
            className="flex-shrink-0"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        )}
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
