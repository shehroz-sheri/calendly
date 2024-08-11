import { prisma } from "@/config/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { hostId } = await req.json();

    const events = await prisma.event.findMany({
      where: { hostId: hostId },
      select: {
        id: true,
        visitCount: true,
        visitRecords: true,
      },
    });

    const visitStats = events.reduce((acc, event) => {
      acc[event.id] = {
        visitCount: event.visitCount,
        peakHours: event.visitRecords.reduce((peakAcc, visit) => {
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
};
