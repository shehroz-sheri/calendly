import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { fetchAvailability } from "@/redux/slices/fetchAvailabilitySlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { EventType } from "@/types/types";
import toast from "react-hot-toast";
import { format, addMinutes, isBefore } from "date-fns";
import { convertTo12HourFormat } from "@/utils/timeConversion";
import { parseTime } from "@/utils/parseTime";

export const useScheduleEvent = () => {
  const session = useSession();

  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector(
    (state: RootState) => state?.fetchAvailability
  );

  const [state, setState] = useState({
    eventForm: false,
    timeFrom: "",
    timeTo: "",
    eventLink: undefined as string | undefined,
    username: "",
    isNotAvailability: false,
    selectedSlot: null as string | null,
    selectedDate: null as Date | null,
    endingTime: "" as string | null,
    eventDetails: {
      endTime: null as string | null,
      meetingDate: null as string | null,
      startTime: null as string | null,
      attendeeName: null as string | undefined | null,
    },
  });

  const getAvailability = async () => {
    const res = await dispatch(fetchAvailability());

    if (fetchAvailability.fulfilled.match(res)) {
      setState((prev) => ({
        ...prev,
        timeFrom: convertTo12HourFormat(res?.payload?.timeFrom),
        timeTo: convertTo12HourFormat(res?.payload?.timeTo),
      }));
      return;
    }
    if (fetchAvailability.rejected.match(res)) {
      setState((prev) => ({
        ...prev,
        isNotAvailability: true,
      }));
    }
  };

  useEffect(() => {
    if (session?.data?.user?.name) {
      setState((prev) => ({
        ...prev,
        username: session?.data?.user?.name,
      }));
    }

    getAvailability();
  }, [session, dispatch]);

  const handleEventScheduled = (eventDetail?: EventType) => {
    if (eventDetail) {
      setState((prev) => ({
        ...prev,
        eventLink: eventDetail?.eventId,
        eventDetails: {
          ...prev.eventDetails,
          attendeeName: eventDetail?.attendeeName,
        },
      }));
    }
  };

  const generateTimeSlots = () => {
    const slots = [];
    const currentTime = parseTime(state.timeFrom);
    const endTime = parseTime(state.timeTo);

    while (currentTime <= endTime) {
      slots.push(format(currentTime, "h:mmaaa"));
      currentTime.setMinutes(currentTime.getMinutes() + 30);
    }

    return slots.slice(0, -1);
  };

  const timeSlots = generateTimeSlots();

  const handleSlotClick = (slot: string) => {
    setState((prev) => ({
      ...prev,
      selectedSlot: slot,
    }));
  };

  const calculateEndTime = (): string | null => {
    if (state.selectedSlot) {
      const selectedTime = parseTime(state.selectedSlot);
      const endTime = addMinutes(selectedTime, 30);
      return format(endTime, "h:mmaaa");
    }
    return null;
  };

  const handleDateSelect = (date: Date) => {
    setState((prev) => ({
      ...prev,
      selectedDate: date,
    }));
  };

  const scheduleEventTime = () => {
    if (!state.selectedDate) {
      return toast.error("Please select a date");
    }
    if (!state.selectedSlot) {
      return toast.error("Please select a time slot.");
    }

    const selectedDateTime = parseTime(state.selectedSlot);
    selectedDateTime.setFullYear(state.selectedDate?.getFullYear());
    selectedDateTime.setMonth(state.selectedDate?.getMonth());
    selectedDateTime.setDate(state.selectedDate?.getDate());

    const now = new Date();
    if (isBefore(selectedDateTime, now)) {
      return toast.error("Selected time is in the past.");
    }

    const endTime = calculateEndTime();
    setState((prev) => ({
      ...prev,
      endingTime: endTime,
      eventForm: true,
      eventDetails: {
        endTime,
        meetingDate:
          formatSelectedDate(state.selectedDate) +
          " " +
          state.selectedDate?.getFullYear(),
        startTime: state.selectedSlot,
        attendeeName: null,
      },
    }));
  };

  const formatSelectedDate = (date: Date | null) => {
    if (!date) return "";
    return format(date, "EEEE, MMMM d");
  };

  return {
    eventForm: state.eventForm,
    setEventForm: (eventForm: boolean) =>
      setState((prev) => ({ ...prev, eventForm })),
    loading: loading,
    session,
    username: state.username,
    isNotAvailability: state.isNotAvailability,
    timeFrom: state.timeFrom,
    timeTo: state.timeTo,
    eventLink: state.eventLink,
    formatSelectedDate,
    selectedSlot: state.selectedSlot,
    endingTime: state.endingTime,
    selectedDate: state.selectedDate,
    handleEventScheduled,
    eventDetails: state.eventDetails,
    handleDateSelect,
    handleSlotClick,
    timeSlots,
    scheduleEventTime,
  };
};
