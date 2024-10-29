"use client";

import { EmergencyContext } from "@/app/home/emergency-data-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { Mic, MicOff, PhoneMissed, User, UserRoundCog } from "lucide-react"; // Import MicOff
import React, { useContext, useEffect, useRef, useState } from "react";

const PeerAudioCall = ({ endCallStatus }: { endCallStatus: () => void }) => {
  const { peer, location, peerId } = useContext(EmergencyContext);

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
    endCallStatus();
    if (currentCall) {
      currentCall.close();
      setIsRemoteConnected(false);
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
    <div className="flex flex-col items-center gap-4">
      <div className=" flex items-center flex-col gap-2">
        <VoiceDetailsUI
          location={location}
          name="You"
          isActive={localAudioActive}
        />
        {isRemoteConnected ? (
          <VoiceDetailsUI
            location={location}
            name="Emergency Team"
            isActive={remoteAudioActive}
            isAdmin={true}
          />
        ) : null}
      </div>
      <div className="flex items-center justify-evenly gap-2 bg-black  p-4 rounded-xl w-full max-w-[20em]">
        <Button
          variant={"outline"}
          className="h-[3em] w-[3em] rounded-full"
          onClick={toggleMute}
        >
          {isMuted ? (
            <MicOff className="flex-shrink-0" />
          ) : (
            <Mic className="flex-shrink-0" />
          )}
        </Button>
        <span className="text-white tracking-tighter">
          {isRemoteConnected ? "Connected" : "Not Connected"}
        </span>
        <Button
          onClick={endCall}
          variant={"destructive"}
          className="h-[3em] w-[3em] rounded-full"
        >
          <PhoneMissed className="flex-shrink-0" />
        </Button>
      </div>
      <span className="text-xs text-muted-foreground pl-4">
        Peer ID: {peerId}
      </span>
      <>
        <audio ref={audioRef} autoPlay muted={true} />
        <audio ref={remoteAudioRef} autoPlay muted={false} />
      </>
    </div>
  );
};

const VoiceDetailsUI = ({
  name,
  location,
  isActive,
  isAdmin,
}: {
  name: string;
  location: string | undefined;
  isActive: boolean;
  isAdmin?: boolean;
}) => {
  return (
    <div
      className={clsx(" border-4 p-4 rounded-xl flex items-center gap-2", {
        "border-primary": isActive,
      })}
    >
      <Avatar className="w-[4em] h-[4em]">
        <AvatarFallback>
          {isAdmin ? <UserRoundCog size={30} /> : <User size={30} />}
        </AvatarFallback>
      </Avatar>
      <div className="-space-y-3">
        <h1 className="font-semibold text-xl">{name}</h1>
        <span className="text-muted-foreground text-xs">{location}</span>
      </div>
    </div>
  );
};

export default PeerAudioCall;
