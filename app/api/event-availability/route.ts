import { auth } from "@/auth";
import { prisma } from "@/config/prisma";
import { NextResponse } from "next/server";

export const GET = auth(async function GET(req) {
  const email = req.auth?.user?.email;

  if (!email)
    return NextResponse.json(
      { message: "User is not authenticated" },
      { status: 401 }
    );

  if (email) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (user) {
        const availability = await prisma.userAvailability.findUnique({
          where: {
            id: user?.id,
          },
        });
        return NextResponse.json(
          {
            message: "success",
            availability: availability,
          },
          { status: 200 }
        );
      }
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    } catch (error) {
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
      );
    }
  }
});
