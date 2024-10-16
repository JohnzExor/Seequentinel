import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { createControlComponent } from "@react-leaflet/core";
import L, { LatLngExpression } from "leaflet";

const createRoutingMachine = () => {
  const instance = L.Routing.control({
    waypoints: [
      L.latLng(9.7769525, 118.7341474),
      L.latLng(9.80187, 118.755655),
    ],
    lineOptions: {
      styles: [{ color: "#6FA1EC", weight: 4 }],
      extendToWaypoints: true,
      missingRouteTolerance: 10,
    },
    router: L.Routing.osrmv1({
      // OSRM routing service
      serviceUrl: "https://router.project-osrm.org/route/v1", // Public OSRM service
      profile: "car", // Options: 'car', 'bike', 'foot'
    }),
    showAlternatives: true, // Show alternative routes
    altLineOptions: {
      styles: [{ color: "#FF0000", weight: 4 }],
      extendToWaypoints: true,
      missingRouteTolerance: 10,
    },
    routeWhileDragging: true, // Allows dragging the route
    fitSelectedRoutes: true,
  });
  return instance;
};

const RoutingMachine = createControlComponent(createRoutingMachine);

export default RoutingMachine;
