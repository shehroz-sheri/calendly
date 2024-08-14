import { parse, isAfter } from "date-fns";

export const parseEventDate = (
  meetingDate: string,
  meetingStartTime: string
) => {
  const combinedDateTime = `${meetingDate} ${meetingStartTime}`;
  return parse(combinedDateTime, "EEEE, MMMM dd yyyy hh:mma", new Date());
};

export const isEventUpcoming = (eventDate: Date) =>
  isAfter(eventDate, new Date());
