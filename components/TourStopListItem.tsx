import React from "react";
import Image from "next/image";

interface TourStopListItemProps {
  location: string;
  title: string;
  artist: string;
  coverImage?: string;
}

const TourStopListItem: React.FC<TourStopListItemProps> = ({
  location,
  title,
  artist,
  coverImage,
}) => {
  return (
    <div className="flex flex-col bg-zinc-800 rounded-xl p-4 mb-4 shadow-md">
      <div className="flex gap-3">
        <Image
          priority={true}
          height={100}
          width={100}
          src={coverImage || "/stub.jpg"}
          alt={title}
          className="w-20 h-20 object-cover rounded-lg border border-zinc-700 bg-zinc-700"
        />
        <div className="flex flex-col justify-center">
          <div className="font-bold text-white text-lg leading-tight">
            {location}
          </div>
          <div className="text-zinc-300 text-base">{title}</div>
          <div className="text-zinc-400 text-sm mt-1">{artist}</div>
        </div>
      </div>
    </div>
  );
};

export default TourStopListItem;
