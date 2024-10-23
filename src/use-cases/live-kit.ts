import { getParticipantToken } from "@/data-access/live-kit";

export const getParticipantTokenUseCase = async (
  room: string,
  name: string
) => {
  if (!room) {
    throw new Error('Missing "room" query parameter');
  }

  if (!name) {
    throw new Error('Missing "username" query parameter');
  }

  const data = getParticipantToken(room, name);
  return data;
};
