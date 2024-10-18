import { LatLngExpression } from "leaflet";

export let userLocation: LatLngExpression = [0, 0];
export let targetLocation: LatLngExpression = [0, 0];

export const SetUserLocation = (position: LatLngExpression) => {
  userLocation = position;
  console.log(userLocation);
};

export const SetTargetLocation = (position: LatLngExpression) => {
  targetLocation = position;
  console.log(targetLocation);
};
