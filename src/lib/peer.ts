import Peer from "peerjs";

export const initializePeer = () => {
  return new Peer({
    config: {
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" }, // Google's free STUN server
        // You can add TURN servers here if needed
      ],
    },
  });
};
