import { prisma } from "@/config/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { userId } = await req.json();

  if (userId) {
    try {
      const existingEvents = await prisma.event.findMany({
        where: {
          hostId: userId,
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
    return NextResponse.json({ message: "Session error. Please login again." }, { status: 401 });
  }
};