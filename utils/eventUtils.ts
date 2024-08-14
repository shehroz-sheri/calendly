import { Event } from "@/types/types";

export const groupEventsByDate = (events: Event[]) => {
  return events.reduce((groupedEvents, event) => {
    (groupedEvents[event?.meetingDate] =
      groupedEvents[event?.meetingDate] || []).push(event);
    return groupedEvents;
  }, {} as Record<string, Event[]>);
};
