import { generateICS } from "../../../utils/generateIcs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { eventDetails } = await req.json();

  const icsContent = generateICS(eventDetails);

  if (!icsContent) {
    return NextResponse.json({ message: "Error generating ICS file" });
  }

  return new NextResponse(icsContent, {
    headers: {
      "Content-Type": "text/calendar",
      "Content-Disposition": 'attachment; filename="event.ics"',
    },
  });
};
