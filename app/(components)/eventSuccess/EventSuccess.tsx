import { EventSuccessProps } from "@/types/types";
import Link from "next/link";
import { CiCalendar } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa6";
import { HiOutlineGlobeAsiaAustralia } from "react-icons/hi2";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { RiExternalLinkLine } from "react-icons/ri";

const EventSuccess: React.FC<EventSuccessProps> = (props) => {
  return (
    <div className="py-8">
      <div className="flex flex-col gap-5 text-center px-1">
        <p className="font-bold text-lg">
          <IoIosCheckmarkCircle className="inline text-success" /> You are
          scheduled
        </p>
        <p>A calendar invitation has been sent to your email address.</p>
        <div>
          <Link
            href={"/dashboard"}
            className="rounded-[40px] border px-4 py-2 border-dark"
          >
            Back to Dashboard <RiExternalLinkLine className="inline" />
          </Link>
        </div>
      </div>

      <div className="border-[1.5px] rounded px-4 py-4 font-bold my-7 w-[95%] md:w-[40%] mx-auto">
        <h5 className="text-xl">30 Minute Meeting</h5>
        <div className="text-dark/60 text-sm flex flex-col gap-3 mt-3">
          <p>
            <FaRegUser className="inline mr-1.5" />
            {props?.eventDetails?.attendeeName}
          </p>
          <div className="">
            <CiCalendar size={20} className="inline" />{" "}
            {props?.eventDetails?.startTime} - {props?.eventDetails?.endTime},{" "}
            {props?.eventDetails?.meetingDate}
          </div>
          <div className="">
            <p>
              <HiOutlineGlobeAsiaAustralia size={20} className="inline" />{" "}
              Pakistan, Maldives Time
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventSuccess;
