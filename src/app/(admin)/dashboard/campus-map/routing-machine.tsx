import L, { LatLngExpression } from "leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { pinIcon } from "./icons";

const RoutingMachine = ({ waypoints }: { waypoints: LatLngExpression[] }) => {
  const map = useMap();
  useEffect(() => {
    const waypointsWithLatLng = waypoints.map((point) => L.latLng(point));
    const routingControl = L.Routing.control({
      waypoints: waypointsWithLatLng, // Use the waypoints prop here
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
        // {
        //   return L.marker(wp.latLng, {
        //     draggable: false,
        //     icon: pinIcon,
        //   });
        // },
      }),
    }).addTo(map); // Make sure to add the control to your map instance

    return () => {
      // Cleanup the routing control on component unmount
      map.removeControl(routingControl);
    };
  }, [waypoints]); // Add waypoints to the dependency array to update on changes

  return null;
};

export default RoutingMachine;
