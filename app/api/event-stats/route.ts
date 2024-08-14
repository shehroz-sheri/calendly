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
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const events = await prisma.event.findMany({
      where: { hostId: user?.id },
      select: {
        id: true,
        visitCount: true,
        visitRecords: true,
      },
    });

    const visitStats = events.reduce((acc, event) => {
      acc[event?.id] = {
        visitCount: event?.visitCount,
        peakHours: event?.visitRecords.reduce((peakAcc, visit) => {
          const hour = new Date(visit).getHours();
          peakAcc[hour] = (peakAcc[hour] || 0) + 1;
          return peakAcc;
        }, {} as Record<number, number>),
      };
      return acc;
    }, {} as Record<string, { visitCount: number; peakHours: Record<number, number> }>);

    return NextResponse.json({ visitStats }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get visit stats" },
      { status: 500 }
    );
  }
});
