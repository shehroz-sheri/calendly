import { EventDetails } from '@/types/types';
import { generateICS } from '@/utils/groupIcs';
import type { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export const POST = async(req: NextApiRequest)=> {
    try {
      const { eventDetails }: { eventDetails: EventDetails[] } = await new Response(req.body).json();

      if (
        !Array.isArray(eventDetails) ||
        !eventDetails.every(e =>
            e.title &&
            e.description &&
            e.location &&
            e.startDateTime &&
            e.endDateTime &&
            e.timeZone
        )
    )  {
        return NextResponse.json({ message: 'Invalid data format' }, { status: 400 });
      }


      const icsContent = generateICS(eventDetails);

      return new NextResponse(icsContent, {
        headers: {
          'Content-Type': 'text/calendar',
          'Content-Disposition': 'attachment; filename="events.ics"',
        },
      });

    } catch (error) {
      return NextResponse.json({ message: 'Error generating ICS file' }, { status: 500 });
    }
}
