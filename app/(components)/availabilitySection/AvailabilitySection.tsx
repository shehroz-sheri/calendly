"use client";

import Image from "next/image";
import Logo from "../logo/Logo";
import TimeDropdown from "../timeDropdown/TimeDropdown";
import { TbSpeakerphone } from "react-icons/tb";
import Link from "next/link";
import { useAvailability } from "./useAvailability";
import { daysOfWeek } from "@/constants/Constants";
import { availabilityImg, progressBar } from "@/public/assets";

const AvailabilitySection: React.FC = () => {
  const {
    days,
    loginStatus,
    loading,
    handleTimeFromChange,
    handleTimeToChange,
    handleCheckboxChange,
    handleSubmit,
  } = useAvailability();

  return (
    <>
      <div className="min-h-screen py-6 flex flex-col justify-center items-center">
        <Logo width={180} className="mx-auto" />
        <form onSubmit={handleSubmit}>
          <div className="w-[95%] bg-white sm:w-[645px] mt-4 mx-auto border-[1.5px] rounded-lg">
            <div className="pt-[32px] px-[12px] sm:px-[24px] border-b-[1.5px]">
              <div className="flex flex-wrap justify-between min-h-[162.4px]">
                <div className="flex flex-col justify-evenly">
                  <h3 className="font-bold text-[18.44px] leading-7">
                    Set your availability
                  </h3>
                  <p className="sm:w-[365px] h-[45px] text-[14.88px] leading-[22.4px]">
                    Let Calendly know when you're typically available to accept
                    meetings.
                  </p>
                </div>
                <div className="w-[185.44px] flex max-sm:mx-auto items-end">
                  <Image
                    width={185.44}
                    height={185.44}
                    src={availabilityImg}
                    alt="Availability"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
            <div className="pt-[32px] px-[12px] sm:px-[24px]">
              <div className="h-[76px] flex flex-col justify-around">
                <p className="font-bold text-[14.88px] leading-[22px]">
                  Available hours
                </p>
                <div className="flex gap-2 sm:gap-4">
                  <TimeDropdown id="timeFrom" onChange={handleTimeFromChange} />
                  <hr className="bg-gray-400 h-[0.8px] my-auto w-8" />
                  <TimeDropdown id="timeTo" onChange={handleTimeToChange} />
                </div>
              </div>
            </div>

            <div className="mt-3 px-[12px] sm:px-[24px] pb-6">
              <div className="min-h-[90px] flex flex-col justify-around">
                <p className="font-bold text-[14.88px] leading-[22px]">
                  Available days
                </p>
                <div className="grid grid-cols-4 gap-0 border-[1.5px] rounded-lg justify-items-center sm:grid-cols-7 max-sm:mt-2">
                  {daysOfWeek?.map((day, index) => (
                    <div
                      key={day?.value}
                      className={`flex flex-col ${
                        index < 6
                          ? "border-r-[1.5px]"
                          : "max-sm:border-r-[1.5px]"
                      } ${
                        index <= 3 ? "max-sm:border-b-[1.5px]" : ""
                      } items-center justify-center w-[84.7px] h-[58px]`}
                    >
                      <input
                        type="checkbox"
                        id={day?.value}
                        value={day?.value}
                        name={day?.value}
                        checked={days[day?.value as keyof typeof days]}
                        onChange={handleCheckboxChange}
                      />
                      <label
                        htmlFor={day?.value}
                        className="mt-2 text-[11.06px]"
                      >
                        {day?.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <p
                className={`flex justify-center ${
                  loginStatus ? "mt-14" : "mt-5"
                }`}
              >
                {loginStatus && (
                  <>
                    <TbSpeakerphone className="transform rotate-[-18deg] sm:me-2 max-sm:text-[22px]" />
                    <span className="text-[14.75px] text-center">
                      Don’t worry! You’ll be able to further customize your
                      availability later on.
                    </span>
                  </>
                )}
              </p>
            </div>
          </div>
          <div className="w-[95%] sm:w-[645px] mt-4 mx-auto">
            <div className="flex justify-between items-center">
              <div>
                <Image
                  width={100}
                  height={100}
                  src={progressBar}
                  alt="progress-bar"
                />
              </div>
              <div>
                {loginStatus && (
                  <Link
                    href={"/dashboard"}
                    className="text-[12.91px] mr-[17px] hover:text-primary"
                  >
                    Set up later
                  </Link>
                )}
                <button
                  className={`bg-primary hover:bg-primary/90 w-[92px] h-11 text-white rounded-[40px] text-[12.91px] leading-[22px] font-bold ${
                    loading ? "cursor-not-allowed opacity-50" : ""
                  }`}
                  type="submit"
                >
                  {loading ? "Loading..." : "Continue"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AvailabilitySection;
