"use client";

import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { Mic, MicOff, PhoneMissed } from "lucide-react"; // Import MicOff
import Peer from "peerjs";
import React, { useEffect, useRef, useState } from "react";

const PeerAudioCall = ({
  peer,
  endCallStatus,
}: {
  peer: Peer;
  endCallStatus: () => void;
}) => {
  const [peerId, setPeerId] = useState<string>();
  const [mediaStream, setMediaStream] = useState<MediaStream>();
  const [localAudioActive, setLocalAudioActive] = useState(false);
  const [remoteAudioActive, setRemoteAudioActive] = useState(false);
  const [isRemoteConnected, setIsRemoteConnected] = useState(false);
  const [currentCall, setCurrentCall] = useState<any>(null);
  const [isMuted, setIsMuted] = useState(false); // New state for mute/unmute

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

      peer.on("open", (id) => {
        setPeerId(id); // Set the peer ID when the connection is established
      });

      peer.on("call", (call) => {
        call.answer(stream); // Answer the call with the local stream
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

  const endCall = () => {
    if (currentCall) {
      currentCall.close();
      setIsRemoteConnected(false);
      endCallStatus();
      if (remoteAudioRef.current) remoteAudioRef.current.srcObject = null;
    }
  };

  // Mute/Unmute functionality
  const toggleMute = () => {
    if (mediaStream) {
      mediaStream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled; // Toggle enabled property
      });
      setIsMuted((prev) => !prev); // Update isMuted state
    }
  };

  return (
    <div
      className={clsx("border-4 rounded-2xl px-4 py-3", {
        "border-primary": remoteAudioActive,
      })}
    >
      <div className="flex items-center justify-between">
        {isRemoteConnected ? (
          <div>
            <span className="text-sm text-primary font-medium">Connected</span>
            <h1 className="text-2xl font-bold">Emergency Team</h1>
          </div>
        ) : (
          <div>
            <span className="text-sm text-primary font-medium">
              Not connected
            </span>
            <h1 className="text-2xl font-bold">Emergency Team</h1>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Button
            variant={"outline"}
            className="h-[3em] w-[3em] rounded-full"
            onClick={toggleMute}
          >
            {isMuted ? (
              <MicOff className="flex-shrink-0" />
            ) : (
              <Mic className="flex-shrink-0" />
            )}{" "}
            {/* Conditional rendering of icons */}
          </Button>
          <Button
            onClick={endCall}
            variant={"destructive"}
            className="h-[3em] w-[3em] rounded-full"
          >
            <PhoneMissed className="flex-shrink-0" />
          </Button>
        </div>
      </div>
      <>
        <audio ref={audioRef} autoPlay muted={true} />
        <audio ref={remoteAudioRef} autoPlay muted={false} />
      </>
    </div>
  );
};

export default PeerAudioCall;
