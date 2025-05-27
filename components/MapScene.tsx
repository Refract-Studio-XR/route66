import React from "react";

const MAP_URL = "https://playground.8thwall.app/simple-map";

const MapScene = () => {
  return (
    <div className="w-full h-[60vh] min-h-[300px] rounded-xl shadow-lg overflow-hidden bg-[#4A4268] relative">
      <iframe
        id="mapScene"
        className="absolute inset-0 w-full h-full"
        src={MAP_URL}
        allow="camera;gyroscope;accelerometer;magnetometer;xr-spatial-tracking;microphone;geolocation"
        title="Route 66 Map"
      />
      <div className="absolute inset-0 z-10 touch-pan-y" />
    </div>
  );
};

export default MapScene;
