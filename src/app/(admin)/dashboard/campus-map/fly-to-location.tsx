import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { LatLngExpression } from "leaflet";

const FlyToLocation = ({ location }: { location: LatLngExpression }) => {
  const map = useMap();

  useEffect(() => {
    if (Array.isArray(location) && !(location[0] === 0 && location[1] === 0)) {
      map.flyTo(location, map.getZoom());
    }
  }, [map, location]);

  return null; // Since this is a functional component for side effects only
};

export default FlyToLocation;
