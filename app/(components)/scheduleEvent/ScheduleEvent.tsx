"use client";

import { FaRegClock, FaGlobeAmericas } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";
import { LuWrench } from "react-icons/lu";
import { FaArrowLeftLong } from "react-icons/fa6";
import { CiCalendar } from "react-icons/ci";
import { HiOutlineGlobeAsiaAustralia } from "react-icons/hi2";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";
import EventHeader from "../eventHeader/EventHeader";
import EventForm from "../eventForm/EventForm";
import Calendar from "../calendar/Calendar";
import CurrentTime from "../currentTime/currentTime";
import EventSuccess from "../eventSuccess/EventSuccess";
import { useScheduleEvent } from "./useScheduleEvent";
import TopCornerImage from "../topCornerImg/TopCornerImg";

const ScheduleEvent: React.FC = () => {
  const {
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
  } = useScheduleEvent();

  if (!eventForm) {
    if (loading || !session.data?.user) return <LoadingSpinner />;
  }

  return (
    <>
      <EventHeader eventLink={eventLink} />

      <div className="bg-light pt-8 lg:pt-[66px] min-h-screen pb-10">
        <div className="relative w-[95%] md:max-w-[1060px] mx-auto bg-white shadow-sm rounded lg:min-h-screen">
          <TopCornerImage />
          {!eventLink ? (
            <div className="lg:flex">
              <div className="min-w-[370px] h-full lg:h-[840px]">
                <div className="w-[304px] min-h-[132px] mt-[18px] sm:ml-[15px] lg:h-[800px] pt-3 pl-4 flex flex-col justify-between">
                  <div>
                    {eventForm && (
                      <p
                        className="rounded-full border p-1.5 mb-6 inline-block"
                        onClick={() => setEventForm(false)}
                      >
                        <FaArrowLeftLong
                          className="text-blue inline"
                          size={24}
                        />
                      </p>
                    )}
                    <p className="font-bold text-dark/60 text-sm">{username}</p>
                    <p className="font-bold text-xl mt-1">30 Minutes Meeting</p>
                  </div>
                  <p className="text-dark/60 font-bold text-sm mt-5 pl-1">
                    <FaRegClock className="inline" /> 30 min
                  </p>
                  {eventForm && (
                    <>
                      <div className="text-dark/60 font-bold text-sm">
                        <div className="my-2.5 flex justify-center items-center">
                          <p>
                            <CiCalendar size={20} />
                          </p>
                          <p>
                            {selectedSlot} - {endingTime},{" "}
                            {formatSelectedDate(selectedDate)},{" "}
                            {selectedDate?.getFullYear()}
                          </p>
                        </div>
                        <div className="my-2">
                          <p>
                            <HiOutlineGlobeAsiaAustralia
                              size={20}
                              className="inline"
                            />{" "}
                            Pakistan, Maldives Time
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                  <div className="mt-auto hidden lg:block">
                    <div className="flex justify-between text-xs">
                      {eventForm && (
                        <>
                          <p className="cursor-pointer text-blue">
                            Cookie settings
                          </p>
                          <p className="cursor-pointer text-dark/70">
                            Report Abuse
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {isNotAvailability ||
              timeFrom == "NaN:00pm" ||
              timeTo == "NaN:00pm" ? (
                <div className="py-5 font-semibold text-center">
                  Set your availability before scheduling an event
                </div>
              ) : (
                <div className="md:w-[687.7px] lg:border-l md:min-h-screen pt-[28px] max-lg:mx-auto flex flex-col">
                  {eventForm ? (
                    <EventForm
                      eventTimeDetails={eventDetails}
                      onEventScheduled={handleEventScheduled}
                    />
                  ) : (
                    <>
                      <p className="font-bold text-[18.75px] ml-8">
                        Select a Date & Time
                      </p>
                      <div className="xl:flex">
                        <div className="md:w-[412.61px]">
                          <Calendar onDateSelect={handleDateSelect} />
                          <div className="ml-4 flex flex-col max-sm:hidden justify-between xl:h-[370px]">
                            <div>
                              <p className="font-bold text-[14.75px] my-1">
                                Time zone
                              </p>
                              <p className="text-[12.91px] ml-3">
                                <FaGlobeAmericas className="inline mr-2" />
                                Pakistan, Maldives Time
                                <CurrentTime />
                                <MdArrowDropDown className="inline" size={18} />
                              </p>
                            </div>
                            <div className="mt-auto max-xl:hidden">
                              <p className="rounded-[40px] border w-[140px] text-[13.13px] h-[44px] border-dark flex justify-center items-center gap-2 cursor-pointer">
                                <LuWrench className="inline" size={16} />{" "}
                                Troubleshoot
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="px-3 mt-11 max-sm:mx-auto">
                          <p className="text-[14.88px]">
                            {!selectedDate && (
                              <span className="text-white">...</span>
                            )}
                            {formatSelectedDate(selectedDate)}
                          </p>
                          <div className="text-primary text-center pb-3 font-bold text-[14.5px] mt-8 max-sm:grid max-sm:grid-cols-2 max-sm:gap-x-4 sm:h-[75vh] overflow-y-scroll mb-8 custom-scrollbar">
                            {timeSlots?.map((time, index) => (
                              <p
                                key={index}
                                className={`pt-[10px] my-2 cursor-pointer rounded border xl:w-[208px] h-[52px] border-primary/50 hover:bg-primary hover:text-white transition duration-200 ${
                                  selectedSlot === time
                                    ? "bg-primary text-white"
                                    : ""
                                }`}
                                onClick={() => handleSlotClick(time)}
                              >
                                {time}
                              </p>
                            ))}
                          </div>
                          <div className="text-sm mt-4 text-white flex gap-4 mb-5">
                            {selectedSlot && (
                              <button className="px-3 py-2 bg-gray-400 rounded-sm">
                                {selectedSlot}
                              </button>
                            )}
                            <button
                              onClick={scheduleEventTime}
                              className="px-6 py-2 bg-blue rounded-sm"
                            >
                              Next
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="h-screen flex flex-col align-middle">
              <div>
                <EventSuccess eventDetails={eventDetails} />
              </div>
              <div className="mt-auto">
                <p className="cursor-pointer text-blue mt-auto p-5">
                  Cookie settings
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ScheduleEvent;
