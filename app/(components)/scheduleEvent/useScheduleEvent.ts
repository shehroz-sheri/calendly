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

  const [eventForm, setEventForm] = useState<boolean>(false);
  const [timeFrom, setTimeFrom] = useState<string>("");
  const [timeTo, setTimeTo] = useState<string>("");
  const [eventLink, setEventLink] = useState<string | undefined>();

  const [username, setUsername] = useState<string>("");
  const [isNotAvailability, setIsNotAvailability] = useState<boolean>(false);

  const getAvailability = async () => {
    const res = await dispatch(fetchAvailability());

    if (fetchAvailability.fulfilled.match(res)) {
      setTimeFrom(convertTo12HourFormat(res?.payload?.timeFrom));
      setTimeTo(convertTo12HourFormat(res?.payload?.timeTo));
      return;
    }
    if (fetchAvailability.rejected.match(res)) {
      setIsNotAvailability(true);
    }
  };

  useEffect(() => {
    if (session?.data?.user?.name) {
      setUsername(session?.data?.user?.name);
    }

    getAvailability();
  }, [session, dispatch]);

  const handleEventScheduled = (eventDetail?: EventType) => {
    if (eventDetails) {
      setEventLink(eventDetail?.eventId);

      setEventDetails({
        ...eventDetails,
        attendeeName: eventDetail?.attendeeName,
      });
    }
  };

  const generateTimeSlots = () => {
    const slots = [];
    const currentTime = parseTime(timeFrom);
    const endTime = parseTime(timeTo);

    while (currentTime <= endTime) {
      slots.push(format(currentTime, "h:mmaaa"));
      currentTime.setMinutes(currentTime.getMinutes() + 30);
    }

    return slots.slice(0, -1);
  };

  const timeSlots = generateTimeSlots();

  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const handleSlotClick = (slot: string) => {
    setSelectedSlot(slot);
  };

  const calculateEndTime = (): string | null => {
    if (selectedSlot) {
      const selectedTime = parseTime(selectedSlot);
      const endTime = addMinutes(selectedTime, 30);
      return format(endTime, "h:mmaaa");
    }
    return null;
  };
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const [endingTime, setEndingTime] = useState<string | null>("");
  const [eventDetails, setEventDetails] = useState<{
    endTime: string | null;
    meetingDate: string | null;
    startTime: string | null;
    attendeeName: string | undefined | null;
  } | null>(null);

  const scheduleEventTime = () => {
    if (!selectedDate) {
      return toast.error("Please select a date");
    }
    if (!selectedSlot) {
      return toast.error("Please select a time slot.");
    }

    const selectedDateTime = parseTime(selectedSlot);
    selectedDateTime.setFullYear(selectedDate?.getFullYear());
    selectedDateTime.setMonth(selectedDate?.getMonth());
    selectedDateTime.setDate(selectedDate?.getDate());

    const now = new Date();
    if (isBefore(selectedDateTime, now)) {
      return toast.error("Selected time is in the past.");
    }

    const endTime = calculateEndTime();
    setEndingTime(endTime);

    setEventForm(true);
    const meetingDate =
      formatSelectedDate(selectedDate) + " " + selectedDate?.getFullYear();

    setEventDetails({
      endTime,
      meetingDate,
      startTime: selectedSlot,
      attendeeName: null,
    });
  };

  const formatSelectedDate = (date: Date | null) => {
    if (!date) return "";
    return format(date, "EEEE, MMMM d");
  };

  return {
    eventForm,
    setEventForm,
    loading,
    session,
    username,
    isNotAvailability,
    timeFrom,
    timeTo,
    eventLink,
    formatSelectedDate,
    selectedSlot,
    endingTime,
    selectedDate,
    handleEventScheduled,
    eventDetails,
    handleDateSelect,
    handleSlotClick,
    timeSlots,
    scheduleEventTime,
  };
};
