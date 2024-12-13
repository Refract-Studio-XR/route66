import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { Button } from "./ui/button";

type ARPlayerProps = {
  url: string;
  onClose: () => void;
};

const ARPlayer = ({ url, onClose }: ARPlayerProps) => {
  return createPortal(
    <div className="fixed inset-0 z-50 bg-black">
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
        allow="camera;microphone;gyroscope;accelerometer"
        allowFullScreen
      />
    </div>,
    document.body
  );
};

export default ARPlayer;
