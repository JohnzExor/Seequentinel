import type { Behaviors, FaultyFacilities, User } from "@prisma/client";

export type IUser = Omit<User, "id" | "createdAt">;
export type IFaultyFacilities = Omit<FaultyFacilities, "id" | "createdAt">;
export type IBehaviors = Omit<Behaviors, "id" | "createdAt">;
