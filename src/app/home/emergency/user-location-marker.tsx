import { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import { userIcon } from "./icons";

const UserLocationMarker = () => {
  const [position, setPosition] = useState<LatLngExpression>([0, 0]);
  const [bbox, setBbox] = useState<string[]>([]);

  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", (e) => {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      // const radius = e.accuracy;
      // const circle = L.circle(e.latlng, radius);
      // circle.addTo(map);
      setBbox(e.bounds.toBBoxString().split(","));
    });
  }, [map]);

  return (
    <Marker position={position} icon={userIcon}>
      <Popup>
        You are here. <br />
        Map bbox: <br />
        <b>Southwest lng</b>: {bbox[0]} <br />
        <b>Southwest lat</b>: {bbox[1]} <br />
        <b>Northeast lng</b>: {bbox[2]} <br />
        <b>Northeast lat</b>: {bbox[3]}
      </Popup>
    </Marker>
  );
};

export default UserLocationMarker;
