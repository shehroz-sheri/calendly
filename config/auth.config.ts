import { NextAuthConfig } from "next-auth";
import { prisma } from "./prisma";

export const authConfig = {
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  secret: process.env.AUTH_SECRET as string,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }

      return token;
    },

    async session({ session, token }) {
      if (token?.id && token?.email) {
        const user = await prisma.user.findUnique({
          where: {
            email: token?.email,
          },
        });

        if (user) {
          session.user = {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user?.image,
            isVerified: user?.isVerified,
            googleId: user?.googleId,
          };
        }
      }
      session.accessToken = token.accessToken as string | undefined;
      session.refreshToken = token.refreshToken as string | undefined;

      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
