"use client";

import { initializePeer } from "@/lib/peer";
import React, { useEffect, useRef, useState } from "react";

const peer = initializePeer();

const Page = () => {
  const [peerId, setPeerId] = useState<string>();
  const [remotePeerId, setRemotePeerId] = useState<string>("");
  const [mediaStream, setMediaStream] = useState<MediaStream>();
  const [localAudioActive, setLocalAudioActive] = useState(false);
  const [remoteAudioActive, setRemoteAudioActive] = useState(false);
  const [isRemoteConnected, setIsRemoteConnected] = useState(false);
  const [currentCall, setCurrentCall] = useState<any>(null);

  const audioRef = useRef<HTMLAudioElement>(null);
  const remoteAudioRef = useRef<HTMLAudioElement>(null);

  // Monitors audio activity using Web Audio API
  const monitorAudioActivity = (stream: MediaStream, setActive: Function) => {
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);

    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const detectAudio = () => {
      analyser.getByteFrequencyData(dataArray);
      const averageVolume =
        dataArray.reduce((sum, val) => sum + val, 0) / bufferLength;

      setActive(averageVolume > 10);
      requestAnimationFrame(detectAudio);
    };

    detectAudio();
  };

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      setMediaStream(stream);
      if (audioRef.current) audioRef.current.srcObject = stream;
      monitorAudioActivity(stream, setLocalAudioActive);

      peer.on("open", setPeerId);

      peer.on("call", (call) => {
        call.answer(stream);
        setCurrentCall(call);
        setIsRemoteConnected(true);

        call.on("stream", (remoteStream) => {
          if (remoteAudioRef.current)
            remoteAudioRef.current.srcObject = remoteStream;
          monitorAudioActivity(remoteStream, setRemoteAudioActive);
        });

        call.on("close", () => {
          console.log("Remote call disconnected");
          setIsRemoteConnected(false);
          if (remoteAudioRef.current) remoteAudioRef.current.srcObject = null;
        });
      });

      // Handle tab close/disconnection
      const handleTabClose = () => {
        if (currentCall) {
          currentCall.close();
          setIsRemoteConnected(false);
          if (remoteAudioRef.current) remoteAudioRef.current.srcObject = null;
        }
      };

      window.addEventListener("beforeunload", handleTabClose);

      return () => {
        window.removeEventListener("beforeunload", handleTabClose);
      };
    });
  }, [currentCall]);

  const callRemotePeerId = () => {
    if (!mediaStream || !remotePeerId) return;

    const call = peer.call(remotePeerId, mediaStream);
    setCurrentCall(call);
    setIsRemoteConnected(true);

    call.on("stream", (remoteStream) => {
      if (remoteAudioRef.current)
        remoteAudioRef.current.srcObject = remoteStream;
      monitorAudioActivity(remoteStream, setRemoteAudioActive);
    });

    call.on("close", () => {
      console.log("Call ended by remote peer");
      setIsRemoteConnected(false);
      if (remoteAudioRef.current) remoteAudioRef.current.srcObject = null;
    });
  };

  const endCall = () => {
    if (currentCall) {
      currentCall.close();
      setIsRemoteConnected(false);
      if (remoteAudioRef.current) remoteAudioRef.current.srcObject = null;
    }
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-4">
      <h1 className="text-lg font-bold">My Peer ID: {peerId}</h1>

      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Enter remote peer ID"
          value={remotePeerId}
          onChange={(e) => setRemotePeerId(e.target.value)}
          className="border rounded px-2 py-1"
        />
        <button
          onClick={callRemotePeerId}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Call Remote Peer
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <AudioDisplay
          label="Local Audio"
          audioRef={audioRef}
          audioActive={localAudioActive}
        />
        <AudioDisplay
          label="Remote Audio"
          audioRef={remoteAudioRef}
          audioActive={remoteAudioActive}
        />
      </div>

      <div className="text-center space-y-2">
        {isRemoteConnected ? (
          <>
            <p className="text-green-500">Remote peer connected</p>
            <button
              onClick={endCall}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              End Call
            </button>
          </>
        ) : (
          <p className="text-red-500">Remote peer disconnected</p>
        )}
      </div>
    </div>
  );
};

// Component for displaying audio and its activity status
const AudioDisplay = ({
  label,
  audioRef,
  audioActive,
}: {
  label: string;
  audioRef: React.RefObject<HTMLAudioElement>;
  audioActive: boolean;
}) => (
  <div>
    <h2 className="text-center">{label}</h2>
    <audio
      ref={audioRef}
      autoPlay
      muted={label === "Local Audio"}
      className="w-full h-10"
    />
    <div
      className={`w-6 h-6 rounded-full mt-2 mx-auto ${
        audioActive ? "bg-green-500" : "bg-gray-500"
      }`}
      title={`${label} indicator`}
    ></div>
  </div>
);

export default Page;
