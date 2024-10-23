"use client";

import {
  ConnectionState,
  ControlBar,
  LiveKitRoom,
  RoomAudioRenderer,
} from "@livekit/components-react";

import "@livekit/components-styles";

import { useEffect, useState } from "react";
import { useServerAction } from "zsa-react";
import { getParticipantTokenAction } from "./actions";

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
  const { execute } = useServerAction(getParticipantTokenAction);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await execute({ room, name });
        if (res[0]) setToken(res[0].token);
      } catch (e) {
        console.error(e);
      }
    };
    fetchToken();
  }, [room]);

  return (
    <LiveKitRoom
      video={false}
      audio={true}
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      data-lk-theme="default"
      className="w-full rounded-xl"
      onDisconnected={onLeave}
    >
      <ConnectionState className="text-center py-2 uppercase" />
      <RoomAudioRenderer />
      <ControlBar
        variation={"minimal"}
        controls={{
          camera: false,
          screenShare: false,
        }}
      />
    </LiveKitRoom>
  );
};

export default CallRoom;
