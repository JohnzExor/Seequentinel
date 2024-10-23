import { AccessToken } from "livekit-server-sdk";

export const getParticipantToken = async (room: string, name: string) => {
  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;
  const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

  if (!apiKey || !apiSecret || !wsUrl) {
    throw new Error("Server misconfigured");
  }
  const at = new AccessToken(apiKey, apiSecret, { identity: name });
  at.addGrant({ room, roomJoin: true, canPublish: true, canSubscribe: true });
  return { token: await at.toJwt() };
};
