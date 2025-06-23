import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { Button } from "./ui/button";

type ARPlayerProps = {
  url: string;
  onClose: () => void;
};

const ARPlayer = ({ url, onClose }: ARPlayerProps) => {
  return createPortal(
    <div className="fixed inset-0 z-[100] bg-black">
      {/* <a data-8code="6q7xc"></a>
      <script
        defer
        src="//cdn.8thwall.com/web/share/embed8.js"
      ></script> */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="absolute top-4 left-4 z-[60] text-white"
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
