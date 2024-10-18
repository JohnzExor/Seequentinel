import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { createControlComponent } from "@react-leaflet/core";
import L from "leaflet";
import { targetLocation, userLocation } from "./data";

const createRoutingMachine = () => {
  const instance = L.Routing.control({
    show: false,
    waypoints: [L.latLng(userLocation), L.latLng(targetLocation)],
    lineOptions: {
      styles: [{ color: "#6FA1EC", weight: 4 }],
      extendToWaypoints: true,
      missingRouteTolerance: 10,
    },
    // router: L.Routing.osrmv1({
    //   // OSRM routing service
    //   serviceUrl: "https://router.project-osrm.org/route/v1", // Public OSRM service
    //   profile: "car", // Options: 'car', 'bike', 'foot'
    // }),
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
