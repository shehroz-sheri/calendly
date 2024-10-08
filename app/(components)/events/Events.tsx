"use client";

import { CgExport } from "react-icons/cg";
import { IoPlay } from "react-icons/io5";
import { MdArrowDropDown, MdOutlineFilterList } from "react-icons/md";
import Link from "next/link";
import { FaSpinner } from "react-icons/fa";
import { useEvents } from "./useEvents";
import { dashboardTabs } from "@/constants/Constants";
import { BiChevronDown } from "react-icons/bi";

const Events: React.FC = () => {
  const {
    events,
    currentTab,
    setCurrentTab,
    loading,
    icsLoading,
    groupedEvents,
    exportEvents,
    filteredDisplayEvents,
  } = useEvents();

  return (
    <>
      <div className="w-[95%] mx-auto">
        <h3 className="font-bold text-[25.7px] mt-4">Scheduled Events</h3>
        <div>
          <div className="mt-12 flex justify-between">
            <div className="relative inline-block w-40">
              <select className="mt-1 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 block h-[46.8px] pl-[17px] w-full appearance-none shadow-sm">
                <option value="option1">My Calendly</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-[17px]">
                <BiChevronDown />
              </div>
            </div>

            <p className="text-[14.5px] text-gray-400 my-auto">
              Displaying {filteredDisplayEvents?.length} of {events?.length}{" "}
              Events
            </p>
          </div>

          <div className="rounded shadow mt-6 border border-gray-300 mb-2">
            <div className="md:flex max-md:flex-col md:justify-between bg-white md:h-16 px-6 max-md:py-2 rounded-t rounded-r border-b border-gray-300">
              <div className="flex gap-5 md:gap-7 max-md:justify-center max-md:mb-2 items-center text-[15px] max-md:border-b max-md:border-gray-300 ">
                {dashboardTabs?.map((tab) => (
                  <p
                    key={tab?.value}
                    onClick={() =>
                      setCurrentTab(
                        tab?.value as "upcoming" | "pending" | "past"
                      )
                    }
                    className={`cursor-pointer max-md:pb-2 ${
                      currentTab === tab?.value
                        ? "text-dark border-b-4 border-primary md:pb-[17px] mt-auto"
                        : "text-dark/60"
                    }`}
                  >
                    {tab?.name}
                  </p>
                ))}
                <p className="cursor-pointer max-md:hidden text-dark/60">
                  Date Range
                  <MdArrowDropDown className="inline" />
                </p>
              </div>
              <div className="flex items-center gap-2 max-md:justify-center max-md:mt-2 text-[12.69px]">
                <button
                  onClick={exportEvents}
                  disabled={icsLoading}
                  className={`rounded-[40px] border border-gray-500 px-[13px] py-1.5 hover:text-white hover:bg-gray-500 hover:border-white transition duration-150 ${
                    icsLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <CgExport className="inline mb-1" /> Export
                </button>
                <button className="rounded-[40px] border border-gray-500 px-[13px] py-1.5 hover:text-white hover:bg-gray-500 hover:border-white transition duration-150">
                  <MdOutlineFilterList className="inline" /> Filter
                </button>
              </div>
            </div>

            <div className="overflow-x-auto min-w-full">
              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <FaSpinner className="animate-spin h-10 w-10 text-primary" />
                </div>
              ) : Object.keys(groupedEvents)?.length > 0 ? (
                Object.keys(groupedEvents)?.map((date) => (
                  <div key={date}>
                    <div className="border-b border-gray-300 h-[58px] px-6 flex items-center max-sm:justify-center bg-gray-100">
                      <p className="font-bold max-sm:text-center text-[14.88px]">
                        {date}
                      </p>
                    </div>
                    <div className="overflow-x-auto min-w-full">
                      <table className="min-w-full divide-y divide-gray-200 text-[13.88px]">
                        <tbody>
                          {groupedEvents[date]?.map((event, i) => (
                            <tr
                              key={i}
                              className="bg-white border-b border-gray-300 h-20"
                            >
                              <td className="px-6 py-4 whitespace-nowrap">
                                <a className="flex items-center">
                                  <div
                                    className={`w-7 h-7 inline-block bg-purple rounded-full mr-2 mb-3.5`}
                                  ></div>
                                  <span className="mb-3.5">
                                    {event?.meetingStartTime} -{" "}
                                    {event?.meetingEndTime}
                                  </span>
                                </a>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <p className="font-bold">
                                  {event?.attendeeName}
                                </p>
                                <p>
                                  Event type&nbsp;
                                  <span className="font-bold">
                                    30 Minute Meeting
                                  </span>
                                </p>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="border-r border-dark pr-1 mr-1">
                                  1 host
                                </span>
                                <span className="">0 non-hosts</span>
                              </td>
                              <td className="pr-6 py-4 whitespace-nowrap">
                                <div>
                                  <Link
                                    href={`/appointment/${event?.id}`}
                                    className="flex items-center justify-end text-dark/60 hover:text-purple cursor-pointer"
                                  >
                                    <IoPlay className="inline mr-1" /> Details
                                  </Link>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-[14.88px] text-dark/60 font-bold py-6">
                  No events found.
                </p>
              )}
            </div>

            <div className="h-12 flex items-center justify-center bg-white">
              <p className="text-[14px] text-dark/60">
                You've reached the end of the list
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Events;
