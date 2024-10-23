import { Icon } from "leaflet";

const universityIcon = new Icon({
  iconUrl: "/marker/university.svg",
  iconSize: [35, 35], // size of the icon
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

const pinIcon = new Icon({
  iconUrl: "/marker/pin.svg",
  iconSize: [35, 35], // size of the icon
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

const userIcon = new Icon({
  iconUrl: "/marker/user.svg",
  iconSize: [35, 35], // size of the icon
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

const emergencyIcon = new Icon({
  iconUrl: "/marker/emergency.svg",
  iconSize: [35, 35], // size of the icon
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

export { universityIcon, pinIcon, userIcon, emergencyIcon };
