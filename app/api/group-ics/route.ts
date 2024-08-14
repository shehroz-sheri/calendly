import { auth } from "@/auth";
import { EventDetails } from "@/types/types";
import { generateICS } from "@/utils/groupIcs";
import { NextResponse } from "next/server";

export const POST = auth(async function POST(req) {
  try {
    const { eventDetails }: { eventDetails: EventDetails[] } = await req.json();

    if (
      !Array.isArray(eventDetails) ||
      !eventDetails?.every(
        (e) =>
          e?.title &&
          e?.description &&
          e?.location &&
          e?.startDateTime &&
          e?.endDateTime &&
          e?.timeZone
      )
    ) {
      return NextResponse.json(
        { message: "Invalid data format" },
        { status: 400 }
      );
    }

    const icsContent = generateICS(eventDetails);

    return new NextResponse(icsContent, {
      headers: {
        "Content-Type": "text/calendar",
        "Content-Disposition": 'attachment; filename="events.ics"',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error generating ICS file" },
      { status: 500 }
    );
  }
});
