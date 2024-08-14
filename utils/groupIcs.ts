import { EventDetails } from "@/types/types";

export const generateICS = (events: EventDetails[]): string => {
  let icsContent =
    "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Your Company//NONSGML v1.0//EN\n";

  events.forEach((event) => {
    const startDateTime = new Date(event?.startDateTime)
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d+Z$/, "Z");
    const endDateTime = new Date(event?.endDateTime)
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d+Z$/, "Z");

    icsContent += `BEGIN:VEVENT\n`;
    icsContent += `SUMMARY:${event.title}\n`;
    icsContent += `DESCRIPTION:${event.description}\n`;
    icsContent += `LOCATION:${event.location}\n`;
    icsContent += `DTSTART:${startDateTime}\n`;
    icsContent += `DTEND:${endDateTime}\n`;
    icsContent += `END:VEVENT\n`;
  });

  icsContent += "END:VCALENDAR";

  return icsContent;
};
