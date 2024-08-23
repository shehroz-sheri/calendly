import { AppointmentDetails } from "@/types/types";
import {
  FaCalendarAlt,
  FaCalendarPlus,
  FaClock,
  FaEnvelope,
  FaUser,
} from "react-icons/fa";

export const getAppointmentDetails = (
  appointment: AppointmentDetails | null
) => [
  {
    icon: <FaCalendarPlus className="text-light" />,
    title: "Event ID",
    content: appointment?.eventId || "",
    iconBgColor: "bg-primary",
  },
  {
    icon: <FaUser className="text-success" />,
    title: "Host Details",
    content: `${appointment?.hostName || ""}\n${appointment?.hostEmail || ""}`,
    iconBgColor: "bg-green-100 dark:bg-green-900",
  },
  {
    icon: <FaUser className="text-lemon" />,
    title: "Invitee Details",
    content: `${appointment?.inviteeName || ""}\n${
      appointment?.inviteeEmail || ""
    }`,
    iconBgColor: "bg-yellow-100 dark:bg-yellow-900",
  },
  {
    icon: <FaCalendarAlt className="text-danger" />,
    title: "Meeting Date",
    content: appointment?.meetingDate || "",
    iconBgColor: "bg-red-100 dark:bg-red-900",
  },
  {
    icon: <FaClock className="text-purple" />,
    title: "Meeting Time",
    content: `${appointment?.meetingStartTime || ""} - ${
      appointment?.meetingEndTime || ""
    }`,
    iconBgColor: "bg-purple/20 dark:bg-purple-900",
  },
  {
    icon: <FaEnvelope className="text-gray-500" />,
    title: "Meeting Message",
    content: appointment?.meetingMessage || "",
    iconBgColor: "bg-gray-100 dark:bg-gray-900",
  },
];
