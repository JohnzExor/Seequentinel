import { LoginUser } from "@/data-access/user";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const BASE_PATH = "/api/auth";

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials): Promise<any> {
        try {
          if (!credentials?.email || !credentials?.password) return null;

          const user = await LoginUser(credentials.email, credentials.password);
          return { ...user, error: null };
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ user, token }) => {
      if (user) {
        return {
          ...token,
          id: user.id,
          email: user.email,
        };
      }
      return token;
    },
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          email: token.email,
        },
      };
    },
  },
};
