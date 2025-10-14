import { createPortal } from "react-dom";
import { useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "./ui/button";

type ARPlayerProps = {
  url: string;
  onClose: () => void;
};

const ARPlayer = ({ url, onClose }: ARPlayerProps) => {
  useEffect(() => {
    // Push a new history state when AR player opens
    window.history.pushState({ arPlayerOpen: true }, "");

    // Handle back button press
    const handlePopState = () => {
      onClose();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-[100] bg-black">
      {/* <a data-8code="6q7xc"></a>
      <script
        defer
        src="//cdn.8thwall.com/web/share/embed8.js"
      ></script> */}
      <div className="absolute top-0 left-0 z-[60]">
        <Image
          src="/rt66logo.png"
          alt="Route 66 Logo"
          width={79}
          height={79}
          className="object-contain"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
          priority
        />
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="absolute top-4 right-4 z-[60] text-white"
      >
        <X className="h-6 w-6" />
      </Button>
      <iframe
        className="h-full w-full"
        src={url}
        allow="camera;gyroscope;accelerometer;magnetometer;xr-spatial-tracking;microphone;geolocation"
        allowFullScreen
      />
    </div>,
    document.body
  );
};

export default ARPlayer;
