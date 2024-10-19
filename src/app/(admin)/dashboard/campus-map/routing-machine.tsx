import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";

const createRoutineMachineLayer = () => {
  const instance = L.Routing.control({
    waypoints: [
      L.latLng([9.788644, 118.74893]),
      L.latLng([9.765764, 118.736849]),
    ],
    lineOptions: {
      styles: [{ color: "#6FA1EC", weight: 4 }],
      extendToWaypoints: true,
      missingRouteTolerance: 15,
    },
    altLineOptions: {
      styles: [{ color: "gray", weight: 4 }],
      extendToWaypoints: true,
      missingRouteTolerance: 15,
    },
    show: false,
    addWaypoints: false,
    routeWhileDragging: true,
    fitSelectedRoutes: true,
    showAlternatives: true,
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
