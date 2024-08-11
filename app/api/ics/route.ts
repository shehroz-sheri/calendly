import { NextApiRequest } from "next";
import { generateICS } from "../../../utils/generateIcs";
import { NextResponse } from "next/server";

export const POST = async (req: NextApiRequest) => {
  const { eventDetails } = await new Response(req.body).json();

  const icsContent = generateICS(eventDetails);

  if (!icsContent) {
    return NextResponse.json({ message: "Error generating ICS file" });
  }

  return new NextResponse(icsContent, {
    headers: {
      'Content-Type': 'text/calendar',
      'Content-Disposition': 'attachment; filename="event.ics"',
    },
  });
};
