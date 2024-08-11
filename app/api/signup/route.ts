import { prisma } from "@/config/prisma";
import { NextApiRequest } from "next";
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
        email: data.email,
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
    await sendVerificationEmail(user.email, verificationUrl);

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });  
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
};
