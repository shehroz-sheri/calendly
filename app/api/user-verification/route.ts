import { prisma } from "@/config/prisma";
import sendVerificationEmail from "@/libs/sendVerifyEmail";
import { verifyUser } from "@/libs/verifyUser";
import { generateVerificationToken } from "@/utils/generateVerificationToken";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  let { email, password } = await req.json();

  if (!email || !password)
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    if (!user?.isVerified) {
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

      try {
        await sendVerificationEmail(email, verificationUrl);
      } catch (error: any) {
        if (error.message === "Error sending email") {
          return NextResponse.json(
            {
              message: "Error sending email",
            },
            { status: 500 }
          );
        }
        return NextResponse.json(
          {
            message:
              "User created but unable to send verification email. Either your email is not correct or do not exist. Please double check your email and try again.",
          },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { message: "Verification email sent" },
        { status: 203 }
      );
    }
    const isPassword = user?.password;
    if (isPassword) {
      const verifyPassword = await verifyUser(email, password);
      if (verifyPassword) {
        return NextResponse.json(
          { message: "User credentials verified" },
          { status: 200 }
        );
      }
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 406 }
      );
    }
    return NextResponse.json(
      { message: "Password not found" },
      { status: 404 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Internal server error", status: 500 });
  }
};
