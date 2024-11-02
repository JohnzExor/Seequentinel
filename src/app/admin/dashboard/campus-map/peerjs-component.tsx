import clsx from "clsx";
import Peer, { MediaConnection } from "peerjs";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Mic,
  MicOff,
  PhoneCall,
  PhoneMissed,
  User,
  UserRoundCog,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DataContext } from "./data-provider";

const PeerJSComponent = ({
  peer,
  remotePeerId,
  acceptCall,
  cancelCall,
}: {
  peer: Peer | null;
  remotePeerId?: string | null;
  acceptCall: () => void;
  cancelCall: () => void;
}) => {
  const { adminPeerId } = useContext(DataContext);

  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [isRemoteConnected, setIsRemoteConnected] = useState(false);
  const [currentCall, setCurrentCall] = useState<any>(null);
  const [isMuted, setIsMuted] = useState(false); // New state for mute/unmute

  const [localAudioActive, setLocalAudioActive] = useState(false);
  const [remoteAudioActive, setRemoteAudioActive] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const remoteAudioRef = useRef<HTMLAudioElement>(null);

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

  const getAudio = async () => {
    try {
      const stream: MediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      setMediaStream(stream);
      monitorAudioActivity(stream, setLocalAudioActive);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleRemote = (call: MediaConnection) => {
    setIsRemoteConnected(true);

    call.on("stream", (remoteStream) => {
      console.log("remote is connected");
      setCurrentCall(call);

      if (remoteAudioRef.current) {
        remoteAudioRef.current.srcObject = remoteStream;
        monitorAudioActivity(remoteStream, setRemoteAudioActive);
      }
    });

    call.on("close", () => {
      console.log("Remote disconnected");
      setIsRemoteConnected(false);
      if (remoteAudioRef.current) remoteAudioRef.current.srcObject = null;
    });

    call.on("error", (error) => {
      console.error(error);
    });
  };

  useEffect(() => {
    getAudio();
    if (!peer) return;

    peer.on("error", (error) => {
      console.error(error);
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
  }, []);

  const toggleMute = () => {
    if (mediaStream) {
      mediaStream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled; // Toggle enabled property
      });
      setIsMuted((prev) => !prev); // Update isMuted state
    }
  };

  const callRemotePeerId = async () => {
    if (!remotePeerId || !peer)
      return console.log("There's no remote peerid to call");
    const call = peer.call(remotePeerId, mediaStream as MediaStream);
    handleRemote(call);
    acceptCall();
  };

  const endCall = () => {
    cancelCall();
    if (currentCall) {
      currentCall.close();
      setIsRemoteConnected(false);
      if (remoteAudioRef.current) remoteAudioRef.current.srcObject = null;
    }
  };

  return (
    <>
      {isRemoteConnected ? (
        <div className="flex flex-col items-center gap-4 text-base">
          <div className=" flex items-center flex-col gap-2 w-full">
            <VoiceDetailsUI
              location={"null"}
              name="You"
              isActive={localAudioActive}
            />
            <audio ref={audioRef} autoPlay muted={true} />
            {isRemoteConnected ? (
              <VoiceDetailsUI
                location={"null"}
                name="Caller"
                isActive={remoteAudioActive}
                isAdmin={true}
              />
            ) : null}
            <audio ref={remoteAudioRef} autoPlay muted={false} />
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
        </div>
      ) : (
        <div className="pb-4 flex gap-2">
          <Button
            onClick={callRemotePeerId}
            disabled={adminPeerId ? false : true}
            className="flex items-center gap-2 w-full rounded-full h-[3em]"
          >
            <PhoneCall />
            <span>Accept Call</span>
          </Button>
          <Button
            onClick={endCall}
            variant={"destructive"}
            className="rounded-full h-[3em]"
          >
            <PhoneMissed />
          </Button>
        </div>
      )}
    </>
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
      className={clsx(
        " border-4 p-4 rounded-xl flex items-center gap-2 w-full",
        {
          "border-primary": isActive,
        }
      )}
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

export default PeerJSComponent;
