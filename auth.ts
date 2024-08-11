import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./config/prisma";
import Google from "next-auth/providers/google";
import { authConfig } from "./config/auth.config";


export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Google({
      async profile(profile) {
        let user = await prisma.user.findUnique({
          where: {
            email: profile.email,
          },
        });

        if (!user) {
          await prisma.user.create({
            data: {
              email: profile.email,
              name: profile.name,
              image: profile.picture,
              googleId: profile.sub,
              isVerified: true,
            },
          });
        }

        if (user && user.password) {
          const newUser = (({ id, ...o }) => o)(user);

          await prisma.user.update({
            where: { email: profile.email },
            data: {
              ...newUser,
              image: profile.picture,
              googleId: profile.sub,
              isVerified: true,
            },
          });
        }

        return {
          id: profile.sub,
          email: profile.email,
          name: profile.name,
          image: profile.picture,
          provider: "google",
          googleId: profile.sub,
        };
      },
      authorization: {
        params: {
          scope:
            "openid email profile https://www.googleapis.com/auth/calendar",
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (
          !credentials ||
          typeof credentials.email !== "string" ||
          typeof credentials.password !== "string"
        ) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        
        if (user) {
          return user;
        } else {
          throw new Error("Something went wrong");
        }
      },
    }),
  ],
  
});