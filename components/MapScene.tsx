type Props = {
  mapContainerRef: React.RefObject<HTMLDivElement | null>;
};

const MapScene = ({ mapContainerRef }: Props) => {
  return (
    <div
      className="w-full h-[60vh] min-h-[300px] rounded-xl overflow-hidden relative"
      style={{
        boxShadow:
          "0 20px 20px -20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)",
        filter: "drop-shadow(0 1px 10px rgba(0, 0, 0, 0.3))",
      }}
    >
      <div
        id="map"
        className="w-full h-full rounded-xl bg-white/5"
        style={{ width: "100%", height: "100%" }}
        ref={mapContainerRef}
      />
    </div>
  );
};

export default MapScene;
