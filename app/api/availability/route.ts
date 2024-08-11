import { prisma } from "@/config/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { email, availability } = await req.json();

    if (!email || !availability)
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });

    let timeFrom = String(availability.fromHours);
    let timeTo = String(availability.toHours);

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }

    const existingAvailability = await prisma.userAvailability.findUnique({
      where: {
        id: user.id,
      },
    });

    let createdAvailability;

    if (existingAvailability) {
      createdAvailability = await prisma.userAvailability.update({
        where: {
          id: existingAvailability.id,
        },
        data: {
          days: availability.selectedDays,
          timeFrom: timeFrom,
          timeTo: timeTo,
        },
      });
    } else {
      createdAvailability = await prisma.userAvailability.create({
        data: {
          days: availability.selectedDays,
          timeFrom: timeFrom,
          timeTo: timeTo,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });
    }

    return NextResponse.json({ message: "success" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
