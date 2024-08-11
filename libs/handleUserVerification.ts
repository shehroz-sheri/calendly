"use client";

import { prisma } from "@/config/prisma";
import { generateVerificationToken } from "@/utils/generateVerificationToken";
import sendVerificationEmail from "./sendVerifyEmail";

export async function handleUserVerification(email: string) {
  const verified = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!verified?.isVerified) {
    const { token: verificationToken, tokenExpiry } =
      generateVerificationToken();
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        verificationToken,
        verificationTokenExpires: tokenExpiry,
      },
    });

    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/verify-email?token=${verificationToken}`;
    await sendVerificationEmail(email, verificationUrl);

    let message = "Verification email sent";

    return message;
  }
}
