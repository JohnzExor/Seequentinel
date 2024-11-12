import { Icon } from "leaflet";

const emergencyIcon = new Icon({
  iconUrl: "/marker/emergency.svg",
  iconSize: [35, 35], // size of the icon
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

const responderIcon = new Icon({
  iconUrl: "/marker/responder.svg",
  iconSize: [35, 35], // size of the icon
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

export { emergencyIcon, responderIcon };
