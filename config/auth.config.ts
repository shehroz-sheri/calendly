import { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

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
        token.id = user?.id;
      }
      if (account) {
        token.accessToken = account?.access_token;
        token.refreshToken = account?.refresh_token;
      }

      return token;
    },

    async session({ session, token }) {
      if (token?.id && token?.email) {
        session.user = {
          id: token?.id,
          email: token?.email,
          name: token?.name,
          image: token?.image,
          isVerified: token?.isVerified,
          googleId: token?.googleId,
        };
      }

      session.accessToken = token?.accessToken as string | undefined;
      session.refreshToken = token?.refreshToken as string | undefined;

      return session;
    },
    authorized: async ({ auth, request }) => {
      const { pathname } = new URL(request.url);

      if (pathname === "/") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }

      if (pathname === "/profile") {
        return NextResponse.redirect(
          new URL("/profile/edit-profile", request.url)
        );
      }

      const publicRoutes = [
        "/auth/login",
        "/auth/signup",
        "/auth/forgot-password",
        "/auth/reset-password",
      ];
      const isPublicRoute =
        publicRoutes.includes(pathname) ||
        /^\/appointment(\/.*)?$/.test(pathname);

      if (!auth && !isPublicRoute) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
      }

      if (auth && isPublicRoute) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
