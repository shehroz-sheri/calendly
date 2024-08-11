import { prisma } from "@/config/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { email, data } = await req.json();

  if (!email || !data) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  try {
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        name: data,
      },
    });
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
