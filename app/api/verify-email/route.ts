import { prisma } from "@/config/prisma";
import { NextRequest, NextResponse } from "next/server";

const baseURL = process.env.NEXT_PUBLIC_APP_URL;

export const GET = async (req: NextRequest) => {
  const requestUrl = req.url ?? "";
  const { searchParams } = new URL(requestUrl);
  const token = searchParams.get("token");

  if (!token || typeof token !== "string") {
    return NextResponse.json({ message: "Invalid token" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findFirst({
      where: { verificationToken: token },
    });

    if (
      !user ||
      !user?.verificationTokenExpires ||
      user?.verificationTokenExpires < new Date()
    ) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 400 }
      );
    }

    await prisma.user.update({
      where: { id: user?.id },
      data: {
        verificationToken: null,
        verificationTokenExpires: null,
        isVerified: true,
      },
    });

    return NextResponse.redirect(new URL("/auth/login?verified=true", baseURL));
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
