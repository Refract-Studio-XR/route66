import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
const PREVIEW_ANIMATION = "/ehren_demo.webm";

type ARPreviewSliderProps = {
  slides: Array<{
    id: string;
    title: string;
  }>;
};

const INNER_FRAME_URL = "https://8w.8thwall.app/inner-ar";
const MAP_URL = "https://playground.8thwall.app/simple-map";

const ARPreviewSlider = ({ slides }: ARPreviewSliderProps) => {
  console.log(slides);
  const [showAR, setShowAR] = useState(false);
  const [emblaRef] = useEmblaCarousel({
    align: "center",
    skipSnaps: false,
    dragFree: false,
    containScroll: "keepSnaps",
    startIndex: 1,
    inViewThreshold: 0.7,
  });

  return (
    <div className="px-4 py-12">
      <div
        className="overflow-hidden"
        ref={emblaRef}
      >
        <div className="flex ml-[10%]">
          <div
            style={{
              flex: "0 0 70%",
              marginRight: "12px",
            }}
            className="relative aspect-square rounded-lg overflow-hidden"
          >
            <iframe
              id="mapScene"
              className="absolute inset-0 w-full h-full"
              src={MAP_URL}
              allow="camera;gyroscope;accelerometer;magnetometer;xr-spatial-tracking;microphone;geolocation"
            />
          </div>

          <div
            style={{
              flex: "0 0 70%",
              marginRight: "12px",
            }}
            className="relative aspect-square rounded-lg bg-[#4A4268] flex items-center justify-center overflow-hidden"
          >
            {showAR ? (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={INNER_FRAME_URL}
                allow="camera;gyroscope;accelerometer;magnetometer;xr-spatial-tracking;microphone;geolocation"
                allowFullScreen
              />
            ) : (
              <>
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
              </>
            )}
          </div>

          <div
            style={{
              flex: "0 0 70%",
              marginRight: "12px",
            }}
            className="relative aspect-square rounded-lg overflow-hidden"
          >
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&controls=0&showinfo=0&rel=0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ARPreviewSlider;
