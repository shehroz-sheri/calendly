'use client'

import { FaRegClock, FaGlobeAmericas } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";
import { LuWrench } from "react-icons/lu";
import { FaArrowLeftLong } from "react-icons/fa6";
import { CiCalendar } from "react-icons/ci";
import { HiOutlineGlobeAsiaAustralia } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { format, addMinutes, isBefore } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { EventType } from "@/types/types";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";
import EventHeader from "../eventHeader/EventHeader";
import EventForm from "../eventForm/EventForm";
import Calendar from "../calendar/Calendar";
import CurrentTime from "../currentTime/currentTime";
import EventSuccess from "../eventSuccess/EventSuccess";
import { fetchAvailability } from "@/redux/slices/fetchAvailabilitySlice";


const ScheduleEvent: React.FC = () => {
    const [eventForm, setEventForm] = useState<boolean>(false);
    const [eventLink, setEventLink] = useState<string | undefined>()

    const [isNotAvailability, setIsNotAvailability] = useState<boolean>(false);

    const [timeFrom, setTimeFrom] = useState<string>("");
    const [timeTo, setTimeTo] = useState<string>("");

    const [username, setUsername] = useState<string>("");

    const session = useSession();

    const dispatch = useDispatch<AppDispatch>();
    const { availability, loading, error } = useSelector((state: RootState) => state.fetchAvailability);

    const getAvailability = async () => {
        const res = await dispatch(fetchAvailability());

        if (fetchAvailability.fulfilled.match(res)) {
            setTimeFrom(convertTo12HourFormat(res.payload?.timeFrom));
            setTimeTo(convertTo12HourFormat(res.payload?.timeTo));
            return
        }
        if (fetchAvailability.rejected.match(res)) {
            setIsNotAvailability(true);
        }
    }

    useEffect(() => {
        if (session.data?.user?.name) {
            setUsername(session.data?.user?.name);
        }

        getAvailability();
    }, [session, dispatch]);

    const convertTo12HourFormat = (hours: string): string => {
        const hour = parseInt(hours);
        if (hour === 0) {
            return `12:00am`;
        } else if (hour < 12) {
            return `${hour}:00am`;
        } else if (hour === 12) {
            return `12:00pm`;
        } else {
            return `${hour - 12}:00pm`;
        }
    };

    const parseTime = (timeStr: string): Date => {
        const [hourStr, minuteStr] = timeStr.split(":");
        let hour = parseInt(hourStr);
        const minute = parseInt(minuteStr?.slice(0, 2));

        if (timeStr.toLowerCase().includes("pm") && hour !== 12) {
            hour += 12;
        } else if (timeStr.toLowerCase().includes("am") && hour === 12) {
            hour = 0;
        }

        const baseDate = new Date("2000-01-01");

        return new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate(), hour, minute);
    };

    const generateTimeSlots = () => {
        const slots = [];
        const currentTime = parseTime(timeFrom);
        const endTime = parseTime(timeTo);

        while (currentTime <= endTime) {
            slots.push(format(currentTime, 'h:mmaaa'));
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
            return format(endTime, 'h:mmaaa');
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
        selectedDateTime.setFullYear(selectedDate.getFullYear());
        selectedDateTime.setMonth(selectedDate.getMonth());
        selectedDateTime.setDate(selectedDate.getDate());

        const now = new Date();
        if (isBefore(selectedDateTime, now)) {
            return toast.error("Selected time is in the past.");
        }

        const endTime = calculateEndTime();
        setEndingTime(endTime);

        setEventForm(true);
        const meetingDate = formatSelectedDate(selectedDate) + ' ' + selectedDate?.getFullYear()

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

    const handleEventScheduled = (eventDetail?: EventType) => {
        if (eventDetails) {
            setEventLink(eventDetail?.eventId);

            setEventDetails({
                ...eventDetails,
                attendeeName: eventDetail?.attendeeName,
            })
        }
    };

    if (!eventForm) {
        if (loading || !session.data?.user) return <LoadingSpinner />
    }


    return (
        <>
            <EventHeader eventLink={eventLink} />

            <div className="bg-light pt-8 lg:pt-[66px] min-h-screen pb-10">
                <div className="w-[95%] lg:w-[85%] 2xl:w-[75.6%] mx-auto bg-white shadow-sm rounded lg:min-h-screen">
                    {!eventLink ? (
                        <div className="lg:flex">
                            <div className="min-w-[370px] h-full">
                                <div className="w-[304px] min-h-[132px] mt-[18px] sm:ml-[15px] pt-3 pl-4 flex flex-col justify-between">
                                    <div>
                                        {eventForm &&
                                            <p className="rounded-full border p-1.5 mb-6 inline-block" onClick={() => setEventForm(false)}>
                                                <FaArrowLeftLong className="text-blue inline" size={24} />
                                            </p>
                                        }
                                        <p className="font-bold text-dark/60 text-sm">{username}</p>
                                        <p className="font-bold text-xl mt-1">30 Minutes Meeting</p>
                                    </div>
                                    <p className="text-dark/60 font-bold text-sm mt-5 pl-1">
                                        <FaRegClock className="inline" /> 30 min
                                    </p>
                                    {eventForm &&
                                        <div className="text-dark/60 font-bold text-sm">
                                            <div className="my-2.5 flex justify-center items-center">
                                                <p>
                                                    <CiCalendar size={20} />
                                                </p>
                                                <p>{selectedSlot} - {endingTime}, {formatSelectedDate(selectedDate)}, {selectedDate?.getFullYear()}</p>
                                            </div>
                                            <div className="my-2">
                                                <p>
                                                    <HiOutlineGlobeAsiaAustralia size={20} className="inline" /> Pakistan, Maldives Time
                                                </p>
                                            </div>
                                        </div>
                                    }
                                    <div className="mt-auto hidden lg:block">
                                        <div className="flex justify-between text-xs">
                                            <p className="cursor-pointer text-blue">Cookie settings</p>
                                            <p className="cursor-pointer text-dark/70">Report Abuse</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                isNotAvailability || timeFrom == 'NaN:00pm' || timeTo == 'NaN:00pm'
                                    ? <div className="py-5 font-semibold text-center">Set your availability before scheduling an event</div>
                                    : <div className="md:w-[687.7px] lg:border-l md:min-h-screen pt-[28px] max-lg:mx-auto flex flex-col">
                                        {eventForm ? (
                                            <EventForm eventTimeDetails={eventDetails} onEventScheduled={handleEventScheduled} />
                                        ) : (
                                            <>
                                                <p className="font-bold text-[18.75px] ml-8">Select a Date & Time</p>
                                                <div className="md:flex">
                                                    <div className="md:w-[412.61px]">
                                                        <Calendar onDateSelect={handleDateSelect} />
                                                        <div className="ml-4 flex flex-col max-sm:hidden">
                                                            <div>
                                                                <p className="font-bold text-[14.75px] my-1">Time zone</p>
                                                                <p className="text-[12.91px] ml-3">
                                                                    <FaGlobeAmericas className="inline mr-2" />
                                                                    Pakistan, Maldives Time
                                                                    <CurrentTime />
                                                                    <MdArrowDropDown className="inline" size={18} />
                                                                </p>
                                                            </div>
                                                            <div className="mt-auto">
                                                                <p className="rounded-[40px] border w-[140px] text-[13.13px] h-[44px] border-dark flex justify-center items-center gap-2 cursor-pointer">
                                                                    <LuWrench className="inline" size={16} /> Troubleshoot
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="w-[90%] md:w-[275px] mt-11 max-sm:mx-auto">
                                                        <p className="text-[14.88px]">{formatSelectedDate(selectedDate)}</p>
                                                        <div className="text-primary text-center pb-3 font-bold text-[14.5px] mt-8 max-sm:grid max-sm:grid-cols-2 max-sm:gap-x-4">
                                                            {timeSlots.map((time, index) => (
                                                                <p
                                                                    key={index}
                                                                    className={`pt-[10px] my-2 cursor-pointer rounded border md:w-[208px] h-[52px] border-primary/50 hover:bg-primary hover:text-white transition duration-200 ${selectedSlot === time ? 'bg-primary text-white' : ''}`}
                                                                    onClick={() => handleSlotClick(time)}
                                                                >
                                                                    {time}
                                                                </p>
                                                            ))}
                                                        </div>
                                                        <div className="text-sm mt-4 text-white flex gap-4 mb-2">
                                                            {selectedSlot && <button className="px-3 py-2 bg-gray-400 rounded-sm">{selectedSlot}</button>}
                                                            <button onClick={scheduleEventTime} className="px-6 py-2 bg-blue rounded-sm">Next</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                            }
                        </div>
                    ) : (
                        <EventSuccess eventDetails={eventDetails} />
                    )}
                </div>
            </div>
        </>
    )
}

export default ScheduleEvent