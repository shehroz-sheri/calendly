import { prisma } from "@/config/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    const appointment = await prisma.event.findUnique({
      where: {
        id: id as string,
      },
      include: {
        host: true,
      },
    });

    if (!appointment) {
      return NextResponse.json(
        { message: "Appointment not found." },
        { status: 404 }
      );
    }

    try {
      const event = await prisma.event.findUnique({
        where: { id: id },
        select: {
          visitCount: true,
          visitRecords: true,
        },
      });

      if (event) {
        await prisma.event.update({
          where: { id: id },
          data: {
            visitCount: event?.visitCount + 1,
            visitRecords: {
              set: [...event.visitRecords, new Date().toISOString()],
            },
          },
        });
      }
    } catch (error) {}

    return NextResponse.json(
      {
        eventId: appointment?.id,
        hostName: appointment?.host?.name,
        hostEmail: appointment?.host?.email,
        inviteeName: appointment?.attendeeName,
        inviteeEmail: appointment?.attendeeEmail,
        meetingDate: appointment?.meetingDate,
        meetingStartTime: appointment?.meetingStartTime,
        meetingEndTime: appointment?.meetingEndTime,
        meetingMessage: appointment?.messageForAttendee,
        googleMeetUrl: appointment?.googleMeetUrl
          ? appointment?.googleMeetUrl
          : "",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
};
