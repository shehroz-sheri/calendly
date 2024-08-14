import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { parseEventDate, isEventUpcoming } from "../../../utils/eventDate";
import { groupEventsByDate } from "../../../utils/eventUtils";
import { Event } from "@/types/types";
import { parseDateTime } from "@/utils/parseMeetTime";
import { fetchEvents, selectEventsLoading } from "@/redux/slices/eventSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import {
  exportEventsThunk,
  selectExportEventsLoading,
} from "@/redux/slices/exportEventsSlice";
import { transformEvent } from "@/utils/transformEvent";

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentTab, setCurrentTab] = useState<"upcoming" | "pending" | "past">(
    "upcoming"
  );

  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectEventsLoading);
  const icsLoading = useAppSelector(selectExportEventsLoading);

  const getEvents = async () => {
    try {
      const res = await dispatch(fetchEvents());

      if (fetchEvents.fulfilled.match(res)) {
        setEvents(res?.payload || []);
      }
    } catch (error) {
      toast.error("Error fetching events. Please try again later.");
      setEvents([]);
      return;
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  const upcomingEvents = events?.filter((event) =>
    isEventUpcoming(parseEventDate(event?.meetingDate, event?.meetingStartTime))
  );
  const pastEvents = events?.filter(
    (event) =>
      !isEventUpcoming(
        parseEventDate(event?.meetingDate, event?.meetingStartTime)
      )
  );

  const sortedUpcomingEvents = upcomingEvents.sort(
    (a, b) =>
      parseEventDate(a?.meetingDate, a?.meetingStartTime).getTime() -
      parseEventDate(b?.meetingDate, b?.meetingStartTime).getTime()
  );
  const sortedPastEvents = pastEvents.sort(
    (a, b) =>
      parseEventDate(b?.meetingDate, b?.meetingStartTime).getTime() -
      parseEventDate(a?.meetingDate, a?.meetingStartTime).getTime()
  );

  const displayEvents =
    currentTab === "upcoming" || currentTab === "pending"
      ? sortedUpcomingEvents
      : sortedPastEvents;

  const groupedEvents = groupEventsByDate(displayEvents);

  const getUpcomingEvents = () => {
    return sortedUpcomingEvents.map((event) =>
      transformEvent({
        ...event,
        startDateTime: parseDateTime(
          event?.meetingDate,
          event?.meetingStartTime,
          "Asia/Karachi"
        ),
        endDateTime: parseDateTime(
          event?.meetingDate,
          event?.meetingEndTime,
          "Asia/Karachi"
        ),
      })
    );
  };

  const getPastEvents = () => {
    return sortedPastEvents.map((event) =>
      transformEvent({
        ...event,
        startDateTime: parseDateTime(
          event?.meetingDate,
          event?.meetingStartTime,
          "Asia/Karachi"
        ),
        endDateTime: parseDateTime(
          event?.meetingDate,
          event?.meetingEndTime,
          "Asia/Karachi"
        ),
      })
    );
  };

  const exportEvents = async () => {
    if (events?.length === 0) {
      toast.error("No events to export!");
      return;
    }

    try {
      const eventDetails =
        currentTab === "upcoming" ? getUpcomingEvents() : getPastEvents();

      const action = await dispatch(exportEventsThunk(eventDetails));

      if (exportEventsThunk.fulfilled.match(action)) {
        const blob = action.payload;
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "events.ics";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      } else if (exportEventsThunk.rejected.match(action)) {
        throw new Error(action.payload as string);
      }
    } catch (error) {
      toast.error("Error exporting events");
    }
  };

  const filteredDisplayEvents =
    currentTab === "upcoming" || currentTab === "pending"
      ? events?.filter((event) =>
          isEventUpcoming(
            parseEventDate(event?.meetingDate, event?.meetingStartTime)
          )
        )
      : events?.filter(
          (event) =>
            !isEventUpcoming(
              parseEventDate(event?.meetingDate, event?.meetingStartTime)
            )
        );

  return {
    events,
    currentTab,
    setCurrentTab,
    loading,
    icsLoading,
    groupedEvents,
    exportEvents,
    filteredDisplayEvents,
  };
};
