import { prisma } from "@/config/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { generateVerificationToken } from "@/utils/generateVerificationToken";
import sendVerificationEmail from "@/libs/sendVerifyEmail";

export const POST = async (req: NextRequest) => {
  let data = await req.json();

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const { token: verificationToken, tokenExpiry } = generateVerificationToken();

  data.password = hashedPassword;
  data.verificationToken = verificationToken;
  data.verificationTokenExpires = tokenExpiry;

  try {
    const isUserAlreadyExists = await prisma.user.findUnique({
      where: {
        email: data?.email,
      },
    });

    if (isUserAlreadyExists) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const user = await prisma.user.create({
      data,
    });

    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/verify-email?token=${verificationToken}`;

    try {
      await sendVerificationEmail(user?.email, verificationUrl);
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
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
