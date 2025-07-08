import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState, useCallback } from "react";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoicmVmcmFjdHN0dWRpbyIsImEiOiJjbWM5YXQ1aDEwaGZqMmtwa2hha3YyeWo5In0.Cv4DzsXyLOR50dtNin7r1Q";

export type MarkerData = {
  coordinates: [number, number];
  id: string | number;
};

type Options = {
  data: MarkerData[];
  onMarkerClick?: (data: MarkerData) => void;
};

const useMapbox = (options?: Options) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map>();
  const geoLocationControlRef = useRef<mapboxgl.GeolocateControl>();
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const onMarkerClickRef = useRef<((data: MarkerData) => void) | undefined>(
    options?.onMarkerClick
  );
  const [selectedMarkerData, setSelectedMarkerData] = useState<
    Options["data"][0] | null
  >(null);

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_TOKEN;

    mapRef.current = new mapboxgl.Map({
      // @ts-expect-error - mapbox-gl types issue
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/standard",
      center: [-106.65145, 35.08443],
      zoom: 12,
      pitch: 40,
    });

    options?.data.forEach((data) => {
      const marker = new mapboxgl.Marker({
        color: "#000",
      })
        .setLngLat(data.coordinates)
        // @ts-expect-error - mapbox-gl types issue
        .addTo(mapRef.current);

      marker.getElement().onclick = () => {
        console.log("Marker clicked:", data);
        setSelectedMarkerData(data);
        onMarkerClickRef.current?.(data);
      };

      markersRef.current.push(marker);
    });

    geoLocationControlRef.current = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
    });

    mapRef.current.addControl(geoLocationControlRef.current);

    mapRef.current.on("load", () => {
      //geoLocationControlRef.current?.trigger();
    });

    return () => mapRef.current?.remove();
  }, []);

  const setOnMarkerClick = useCallback((fn: (data: MarkerData) => void) => {
    console.log("Setting marker click handler");
    onMarkerClickRef.current = fn;
  }, []);

  return {
    mapContainerRef,
    selectedMarkerData,
    setSelectedMarkerData,
    setOnMarkerClick,
  };
};

export default useMapbox;
