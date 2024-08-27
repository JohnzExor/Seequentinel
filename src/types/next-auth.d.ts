import NextAuth from "next-auth";
import type { User as UserPrisma } from "@prisma/client";

declare module "next-auth" {
  interface User extends UserPrisma {
    error: string | null;
  }

  interface Session {
    user: User;
    token: User;
  }
}
