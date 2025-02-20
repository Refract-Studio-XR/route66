import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ARPlayer from "./ARPlayer";

const PREVIEW_ANIMATION = "/ehren_demo.webm";

// type ARPreviewSliderProps = {
//   slides: Array<{
//     id: string;
//     title: string;
//   }>;
// };

const INNER_FRAME_URL = "https://refractstudio.8thwall.app/vps-test";
const MAP_URL = "https://playground.8thwall.app/simple-map";

const ARPreviewSlider = () => {
  const [showAR, setShowAR] = useState(false);
  const [emblaRef] = useEmblaCarousel({
    startIndex: 1,
  });

  return (
    <>
      {showAR && (
        <ARPlayer
          url={INNER_FRAME_URL}
          onClose={() => setShowAR(false)}
        />
      )}

      <div className="py-8">
        <div ref={emblaRef}>
          <div className="flex">
            <div
              className="relative shrink-0 w-[70vw] mr-3 aspect-square rounded-lg bg-[#4A4268] overflow-hidden "
              style={{ marginLeft: "10vw" }}
            >
              <iframe
                id="mapScene"
                className="absolute inset-0 w-full h-full"
                src={MAP_URL}
                allow="camera;gyroscope;accelerometer;magnetometer;xr-spatial-tracking;microphone;geolocation"
              />
              <div className="absolute inset-0 z-10 touch-pan-y" />
            </div>

            <div className="relative shrink-0 w-[70vw] mr-3 aspect-square rounded-lg bg-[#4A4268] flex items-center justify-center overflow-hidden">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source
                  src={PREVIEW_ANIMATION}
                  type="video/webm"
                />
              </video>
              <Button
                variant="outline"
                size="lg"
                className="absolute z-10 bg-[#464B6C] hover:bg-[#464B6C]/90 text-white border-0"
                onClick={() => setShowAR(true)}
              >
                Start AR Experience
              </Button>
            </div>

            <div className="relative shrink-0 w-[70vw] aspect-square rounded-lg bg-[#4A4268] overflow-hidden">
              <img
                src="/olivia.jpg"
                alt="Olivia"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ARPreviewSlider;
