import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState, useCallback } from "react";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

export type MarkerData = {
  coordinates: [number, number];
  id: string | number;
  isAR?: boolean;
  arURL?: string;
};

type Options = {
  data: MarkerData[];
  onMarkerClick?: (data: MarkerData) => void;
};

const useMapbox = (options?: Options) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map>(undefined);
  const geoLocationControlRef = useRef<mapboxgl.GeolocateControl>(undefined);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const onMarkerClickRef = useRef<((data: MarkerData) => void) | undefined>(
    options?.onMarkerClick
  );
  const [selectedMarkerData, setSelectedMarkerData] = useState<
    Options["data"][0] | null
  >(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_TOKEN;

    mapRef.current = new mapboxgl.Map({
      // @ts-expect-error - mapbox-gl types issue//
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/standard",
      center: [-106.6514, 35.08445],
      zoom: 9.3,
      pitch: 40,
    });

    options?.data.forEach((data) => {
      // Determine if this is a "coming soon" location (AR without URL)
      const isComingSoon = data.isAR === true && (!data.arURL || data.arURL === "" || data.arURL.length === 0);
      const markerColor = isComingSoon ? "#9CA3AF" : "#C50E3D"; // grey-400 : red
      console.log(`Location ${data.id}: isAR=${data.isAR}, arURL="${data.arURL}", isComingSoon=${isComingSoon}, color=${markerColor}`);

      const marker = new mapboxgl.Marker({
        color: markerColor,
      })
        .setLngLat(data.coordinates)
        // @ts-expect-error - mapbox-gl types issue
        .addTo(mapRef.current);

      marker.getElement().onclick = () => {
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
      setIsMapLoaded(true);
    });

    return () => mapRef.current?.remove();
  }, []);

  const setOnMarkerClick = useCallback((fn: (data: MarkerData) => void) => {
    onMarkerClickRef.current = fn;
  }, []);

  return {
    mapContainerRef,
    selectedMarkerData,
    setSelectedMarkerData,
    setOnMarkerClick,
    isMapLoaded,
  };
};

export default useMapbox;
