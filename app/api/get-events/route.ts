import { auth } from "@/auth";
import { prisma } from "@/config/prisma";
import { NextResponse } from "next/server";

export const GET = auth(async function GET(req) {
  const userEmail = req.auth?.user?.email;

  if (userEmail) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: userEmail,
        },
      });

      const existingEvents = await prisma.event.findMany({
        where: {
          hostId: user?.id,
        },
      });

      if (existingEvents) {
        return NextResponse.json(
          { message: "Events fetched successfully.", events: existingEvents },
          { status: 200 }
        );
      }

      return NextResponse.json(
        { message: "Events not found." },
        { status: 201 }
      );
    } catch (error) {
      console.error("Error fetching events:", error);
      return NextResponse.json(
        { message: "Error fetching events." },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { message: "Session error. Please login again." },
      { status: 401 }
    );
  }
});
