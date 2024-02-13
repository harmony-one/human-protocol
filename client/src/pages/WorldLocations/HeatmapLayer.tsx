//HeatmapLayer.js
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.heat";
import { ILocation } from "../../firebase/interfaces";

export const HeatmapLayer = ({ locations }: { locations: ILocation[] }) => {
  const map = useMap();

  useEffect(() => {
    if (locations.length > 0) {
      // lat, long, intensity
      const points = locations.map((loc) => [loc.latitude, loc.longitude, 500]);

      // @ts-ignore
      const heatLayer = L.heatLayer(points, { radius: 50, blur: 100 }).addTo(
        map
      );

      return () => {
        map.removeLayer(heatLayer);
      };
    }
  }, [locations, map]);

  return null;
};
