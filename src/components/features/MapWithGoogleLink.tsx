import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerTooltip,
} from "@/components/ui/map";

import "maplibre-gl/dist/maplibre-gl.css";
export const MapWithGoogleLink = () => {
  return (
    <Map center={[17.035206299999995, 51.10823444723654]} zoom={15}>
      <MapMarker latitude={51.10823444723654} longitude={17.035206299999995}>
        <MarkerContent>
          <div className="size-4 rounded-full border bg-accent"></div>
        </MarkerContent>
        <MarkerTooltip>Biuro</MarkerTooltip>
      </MapMarker>
    </Map>
  );
};
