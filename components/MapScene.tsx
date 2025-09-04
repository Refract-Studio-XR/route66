type Props = {
  mapContainerRef: React.RefObject<HTMLDivElement | null>;
};

const MapScene = ({ mapContainerRef }: Props) => {
  return (
    <div className="w-full h-[60vh] min-h-[300px] rounded-xl shadow-lg overflow-hidden relative">
      <div
        id="map"
        style={{ width: "100%", height: "100%" }}
        ref={mapContainerRef}
      />
    </div>
  );
};

export default MapScene;
