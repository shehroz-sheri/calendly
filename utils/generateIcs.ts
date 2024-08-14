import { EventDetailsICS } from "@/types/types";
import { createEvent, DateArray, EventAttributes } from "ics";

export const generateICS = (eventDetails: EventDetailsICS): string | null => {
  const { title, description, location, startDateTime, endDateTime } =
    eventDetails;

  const [startDate, startTime] = startDateTime?.split("T");
  const [endDate, endTime] = endDateTime?.split("T");

  const [startYear, startMonth, startDay] = startDate?.split("-")?.map(Number);
  const [startHour, startMinute] = startTime?.split(":")?.map(Number);
  const [endYear, endMonth, endDay] = endDate?.split("-")?.map(Number);
  const [endHour, endMinute] = endTime?.split(":")?.map(Number);

  const event: EventAttributes = {
    start: [
      startYear,
      startMonth,
      startDay,
      startHour,
      startMinute,
    ] as DateArray,
    end: [endYear, endMonth, endDay, endHour, endMinute] as DateArray,
    title,
    description,
    location,
    status: "CONFIRMED",
    busyStatus: "BUSY",
    startOutputType: "local",
    endOutputType: "local",
  };

  let icsContent: string | null = null;

  createEvent(event, (error, value) => {
    if (error) {
      icsContent = null;
    } else {
      icsContent = value;
    }
  });

  return icsContent;
};
