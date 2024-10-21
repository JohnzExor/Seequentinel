"use client";

import {
  ControlBar,
  LiveKitRoom,
  RoomAudioRenderer,
} from "@livekit/components-react";

import "@livekit/components-styles";

import { useEffect, useState } from "react";

const CallRoom = ({
  room,
  name,
  onLeave,
}: {
  room: string;
  name: string;
  onLeave: () => void;
}) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    if (room) {
      (async () => {
        try {
          const resp = await fetch(
            `/api/get-participant-token?room=${room}&username=${name}`
          );
          const data = await resp.json();
          setToken(data.token);
        } catch (e) {
          console.error(e);
        }
      })();
    }
  }, [room]);

  return (
    <LiveKitRoom
      video={false}
      audio={true}
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      // Use the default LiveKit theme for nice styles.
      data-lk-theme="default"
      className="w-fit rounded-xl"
      onDisconnected={onLeave}
    >
      {/* Your custom component with basic video conferencing functionality. */}
      {/* <MyVideoConference /> */}
      {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
      <RoomAudioRenderer />
      {/* Controls for the user to start/stop audio, video, and screen
      share tracks and to leave the room. */}
      <ControlBar
        variation={"minimal"}
        controls={{
          camera: false, // Disable camera control
          screenShare: false, // Disable screen share control
        }}
      />
    </LiveKitRoom>
  );
};

export default CallRoom;
