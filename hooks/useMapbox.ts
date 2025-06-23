import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoicmVmcmFjdHN0dWRpbyIsImEiOiJjbWM5YXQ1aDEwaGZqMmtwa2hha3YyeWo5In0.Cv4DzsXyLOR50dtNin7r1Q";

const useMapbox = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map>();
  const geoLocationControlRef = useRef<mapboxgl.GeolocateControl>();

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_TOKEN;

    mapRef.current = new mapboxgl.Map({
      // @ts-ignore
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/standard",
      center: [-106.65145, 35.08443],
      zoom: 15,
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

  return { mapContainerRef };
};

export default useMapbox;
