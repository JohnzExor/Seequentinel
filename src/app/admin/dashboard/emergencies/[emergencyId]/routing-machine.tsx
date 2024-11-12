import L, { LatLngExpression } from "leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
import { useContext, useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import { EmergencyDataContext } from "./emergency-data-provider";

const RoutingMachine = () => {
  const { startPoint, endPoint } = useContext(EmergencyDataContext);
  const map = useMap();
  const routingControlRef = useRef<L.Routing.Control | null>(null); // Ref to store routing control instance

  useEffect(() => {
    if (!map) return;

    // Cleanup any existing routing control before creating a new one
    if (routingControlRef.current) {
      map.removeControl(routingControlRef.current);
    }

    const waypoints: LatLngExpression[] = [startPoint, endPoint];
    const waypointsWithLatLng = waypoints.map((point) => L.latLng(point));

    const routingControl = L.Routing.control({
      waypoints: waypointsWithLatLng,
      lineOptions: {
        styles: [{ color: "#6FA1EC", weight: 4 }],
        extendToWaypoints: false,
        missingRouteTolerance: 0,
      },
      altLineOptions: {
        styles: [{ color: "gray", weight: 4 }],
        extendToWaypoints: false,
        missingRouteTolerance: 0,
      },
      addWaypoints: false,
      routeWhileDragging: true,
      fitSelectedRoutes: true,
      showAlternatives: true,
      plan: L.routing.plan(waypointsWithLatLng, {
        createMarker: () => false,
      }),
    }).addTo(map); // Add to map instance

    routingControlRef.current = routingControl; // Store the control instance in the ref

    return () => {
      // Cleanup on unmount
      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current);
      }
    };
  }, [startPoint, endPoint, map]); // Re-run effect when waypoints change

  return null;
};

export default RoutingMachine;
